import * as faceapi from 'face-api.js';

export interface StudentFace {
  id: string;
  name: string;
  descriptor: Float32Array;
  createdAt: Date;
  lastSeen?: Date;
  code?: string;
}

export interface FaceDetectionResult {
  box: { x: number; y: number; width: number; height: number };
  landmarks: faceapi.FaceLandmarks68;
  descriptor: Float32Array;
  confidence: number;
}

export interface RecognitionResult {
  student: StudentFace | null;
  confidence: number;
  box: { x: number; y: number; width: number; height: number };
  isMatch: boolean;
  descriptor?: Float32Array;
}

class FaceApiService {
  private modelsLoaded = false;
  private isLoading = false;
  private modelLoadPromise: Promise<void> | null = null;
  private recognitionThreshold = 0.6;
  private loadingProgress = 0;
  private onProgressCallback?: (progress: number) => void;

  async loadModels(onProgress?: (progress: number) => void): Promise<void> {
    if (this.modelsLoaded) return;
    if (this.isLoading) {
      if (this.modelLoadPromise) return this.modelLoadPromise;
    }

    this.onProgressCallback = onProgress;
    this.isLoading = true;
    this.modelLoadPromise = this.loadModelsInternal();
    
    try {
      await this.modelLoadPromise;
      this.modelsLoaded = true;
      this.updateProgress(100);
    } finally {
      this.isLoading = false;
    }
  }

  private updateProgress(progress: number) {
    this.loadingProgress = progress;
    this.onProgressCallback?.(progress);
  }

  private async loadModelsInternal(): Promise<void> {
    try {
      this.updateProgress(10);
      
      // Try CDN first for faster loading
      const CDN_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model';
      const LOCAL_URL = '/models';
      
      let modelUrl = CDN_URL;
      
      try {
        // Test if CDN is accessible
        const testResponse = await fetch(`${CDN_URL}/ssd_mobilenetv1_model-weights_manifest.json`);
        if (!testResponse.ok) {
          throw new Error('CDN not accessible');
        }
        this.updateProgress(20);
      } catch {
        console.log('CDN not accessible, using local models');
        modelUrl = LOCAL_URL;
        this.updateProgress(15);
      }

      // Load models with progress tracking
      const modelPromises = [
        this.loadModelWithProgress(
          () => faceapi.nets.ssdMobilenetv1.loadFromUri(modelUrl),
          'SSD MobileNet',
          20,
          40
        ),
        this.loadModelWithProgress(
          () => faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
          'Face Landmarks',
          40,
          70
        ),
        this.loadModelWithProgress(
          () => faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
          'Face Recognition',
          70,
          95
        )
      ];

      await Promise.all(modelPromises);
      
      console.log('Face-api.js models loaded successfully');
      this.updateProgress(100);
    } catch (error) {
      console.error('Error loading face-api.js models:', error);
      
      // Fallback: try to load minimal models for basic functionality
      try {
        console.log('Attempting to load minimal models...');
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log('Minimal face detection model loaded');
        this.updateProgress(100);
      } catch (fallbackError) {
        console.error('Failed to load even minimal models:', fallbackError);
        throw new Error('No se pudieron cargar los modelos de reconocimiento facial. Verifica tu conexión a internet.');
      }
    }
  }

  private async loadModelWithProgress(
    loadFunction: () => Promise<void>,
    modelName: string,
    startProgress: number,
    endProgress: number
  ): Promise<void> {
    try {
      console.log(`Loading ${modelName}...`);
      this.updateProgress(startProgress);
      
      await loadFunction();
      
      console.log(`${modelName} loaded successfully`);
      this.updateProgress(endProgress);
    } catch (error) {
      console.error(`Error loading ${modelName}:`, error);
      throw error;
    }
  }

  async detectFaces(input: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement): Promise<FaceDetectionResult[]> {
    if (!this.modelsLoaded) {
      await this.loadModels();
    }

    try {
      // Use different detection methods based on what's available
      let detections;
      
      if (faceapi.nets.ssdMobilenetv1.isLoaded) {
        detections = await faceapi
          .detectAllFaces(input, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
          .withFaceLandmarks()
          .withFaceDescriptors();
      } else if (faceapi.nets.tinyFaceDetector.isLoaded) {
        // Fallback to tiny face detector
        detections = await faceapi
          .detectAllFaces(input, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 }));
      } else {
        throw new Error('No face detection models available');
      }

      if (!detections || detections.length === 0) {
        return [];
      }

      return detections.map(detection => ({
        box: {
          x: detection.detection.box.x,
          y: detection.detection.box.y,
          width: detection.detection.box.width,
          height: detection.detection.box.height
        },
        landmarks: detection.landmarks,
        descriptor: detection.descriptor,
        confidence: detection.detection.score
      }));
    } catch (error) {
      console.error('Error detecting faces:', error);
      return [];
    }
  }

  async recognizeFace(descriptor: Float32Array, knownFaces: StudentFace[]): Promise<RecognitionResult | null> {
    if (knownFaces.length === 0) return null;

    let bestMatch: StudentFace | null = null;
    let bestDistance = Infinity;

    for (const knownFace of knownFaces) {
      const distance = faceapi.euclideanDistance(descriptor, knownFace.descriptor);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = knownFace;
      }
    }

    const confidence = Math.max(0, 1 - bestDistance);
    const isMatch = bestDistance < this.recognitionThreshold;

    return {
      student: isMatch ? bestMatch : null,
      confidence,
      box: { x: 0, y: 0, width: 0, height: 0 }, // Will be set by caller
      isMatch
    };
  }

  async processVideoFrame(
    video: HTMLVideoElement,
    knownFaces: StudentFace[]
  ): Promise<RecognitionResult[]> {
    const detections = await this.detectFaces(video);
    const results: RecognitionResult[] = [];

    for (const detection of detections) {
      if (detection.descriptor) {
        const recognition = await this.recognizeFace(detection.descriptor, knownFaces);
        if (recognition) {
          recognition.box = detection.box;
          recognition.descriptor = detection.descriptor;
          results.push(recognition);
        }
      } else {
        // Even if no descriptor, create a result for unknown face
        results.push({
          student: null,
          confidence: 0,
          box: detection.box,
          isMatch: false,
          descriptor: detection.descriptor
        });
      }
    }

    return results;
  }

  async extractFaceDescriptor(input: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement): Promise<Float32Array | null> {
    const detections = await this.detectFaces(input);
    return detections.length > 0 ? detections[0].descriptor : null;
  }

  setRecognitionThreshold(threshold: number): void {
    this.recognitionThreshold = Math.max(0, Math.min(1, threshold));
  }

  getRecognitionThreshold(): number {
    return this.recognitionThreshold;
  }

  isModelsLoaded(): boolean {
    return this.modelsLoaded;
  }

  getLoadingProgress(): number {
    return this.loadingProgress;
  }

  // Quick initialization for demo mode
  async initializeForDemo(): Promise<void> {
    console.log('Initializing demo mode - skipping model loading');
    this.modelsLoaded = true;
    this.updateProgress(100);
  }

  // Utility method to validate face quality
  validateFaceQuality(detection: FaceDetectionResult): { isValid: boolean; reasons: string[] } {
    const reasons: string[] = [];
    
    // Check if face is large enough
    const minSize = 100;
    if (detection.box.width < minSize || detection.box.height < minSize) {
      reasons.push('Face too small');
    }

    // Check confidence
    if (detection.confidence < 0.7) {
      reasons.push('Low detection confidence');
    }

    // Check if face is roughly centered and not too close to edges
    const aspectRatio = detection.box.width / detection.box.height;
    if (aspectRatio < 0.7 || aspectRatio > 1.3) {
      reasons.push('Face aspect ratio unusual');
    }

    return {
      isValid: reasons.length === 0,
      reasons
    };
  }

  // Helper to resize canvas while maintaining aspect ratio
  createOptimalCanvas(sourceVideo: HTMLVideoElement, maxWidth = 640, maxHeight = 480): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    const { videoWidth, videoHeight } = sourceVideo;
    const aspectRatio = videoWidth / videoHeight;
    
    let width, height;
    if (aspectRatio > maxWidth / maxHeight) {
      width = maxWidth;
      height = maxWidth / aspectRatio;
    } else {
      height = maxHeight;
      width = maxHeight * aspectRatio;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(sourceVideo, 0, 0, width, height);
    
    return canvas;
  }
}

export const faceApiService = new FaceApiService();