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
  private recognitionThreshold = 0.6; // Adjust this value for sensitivity

  async loadModels(): Promise<void> {
    if (this.modelsLoaded) return;
    if (this.isLoading) {
      if (this.modelLoadPromise) return this.modelLoadPromise;
    }

    this.isLoading = true;
    this.modelLoadPromise = this.loadModelsInternal();
    
    try {
      await this.modelLoadPromise;
      this.modelsLoaded = true;
    } finally {
      this.isLoading = false;
    }
  }

  private async loadModelsInternal(): Promise<void> {
    const MODEL_URL = '/models';
    
    try {
      // Load models in parallel for faster loading
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);
      
      console.log('Face-api.js models loaded successfully');
    } catch (error) {
      console.error('Error loading face-api.js models:', error);
      throw error;
    }
  }

  async detectFaces(input: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement): Promise<FaceDetectionResult[]> {
    if (!this.modelsLoaded) {
      await this.loadModels();
    }

    try {
      const detections = await faceapi
        .detectAllFaces(input, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
        .withFaceLandmarks()
        .withFaceDescriptors();

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
      const recognition = await this.recognizeFace(detection.descriptor, knownFaces);
      if (recognition) {
        recognition.box = detection.box;
        recognition.descriptor = detection.descriptor;
        results.push(recognition);
      } else {
        // Even if no match found, create a result for unknown face
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
