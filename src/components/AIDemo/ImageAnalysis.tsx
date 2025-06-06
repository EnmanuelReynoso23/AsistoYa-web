import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Loader, CheckCircle, AlertCircle, Eye, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';

interface AnalysisResult {
  objects: Array<{
    class: string;
    confidence: number;
    bbox: [number, number, number, number];
  }>;
  emotions?: Array<{
    emotion: string;
    confidence: number;
  }>;
  colors: Array<{
    color: string;
    percentage: number;
    hex: string;
  }>;
  metadata: {
    width: number;
    height: number;
    size: string;
  };
}

const ImageAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated AI analysis (in a real app, you'd use TensorFlow.js models)
  const analyzeImage = useCallback(async (imageElement: HTMLImageElement): Promise<AnalysisResult> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract dominant colors
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const colors = extractDominantColors(imageData);

    // Simulated object detection results
    const objects = [
      { class: 'persona', confidence: 0.95, bbox: [100, 50, 200, 300] as [number, number, number, number] },
      { class: 'rostro', confidence: 0.89, bbox: [120, 60, 80, 100] as [number, number, number, number] },
      { class: 'ropa', confidence: 0.76, bbox: [110, 160, 180, 200] as [number, number, number, number] },
    ];

    // Simulated emotion detection
    const emotions = [
      { emotion: 'feliz', confidence: 0.78 },
      { emotion: 'neutral', confidence: 0.15 },
      { emotion: 'concentrado', confidence: 0.07 },
    ];

    return {
      objects,
      emotions,
      colors,
      metadata: {
        width: imageElement.width,
        height: imageElement.height,
        size: `${imageElement.width} × ${imageElement.height}`,
      },
    };
  }, []);

  const extractDominantColors = (imageData: ImageData): Array<{color: string; percentage: number; hex: string}> => {
    const colorMap = new Map<string, number>();
    const data = imageData.data;
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Group similar colors
      const rGroup = Math.floor(r / 32) * 32;
      const gGroup = Math.floor(g / 32) * 32;
      const bGroup = Math.floor(b / 32) * 32;
      
      const colorKey = `${rGroup},${gGroup},${bGroup}`;
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
    }

    // Get top 5 colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const totalPixels = sortedColors.reduce((sum, [, count]) => sum + count, 0);

    return sortedColors.map(([color, count]) => {
      const [r, g, b] = color.split(',').map(Number);
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      const colorName = getColorName(r, g, b);
      
      return {
        color: colorName,
        percentage: Math.round((count / totalPixels) * 100),
        hex,
      };
    });
  };

  const getColorName = (r: number, g: number, b: number): string => {
    if (r > 200 && g > 200 && b > 200) return 'blanco';
    if (r < 50 && g < 50 && b < 50) return 'negro';
    if (r > g && r > b) return 'rojo';
    if (g > r && g > b) return 'verde';
    if (b > r && b > g) return 'azul';
    if (r > 150 && g > 150 && b < 100) return 'amarillo';
    if (r > 150 && g < 100 && b > 150) return 'morado';
    if (r < 100 && g > 150 && b > 150) return 'cian';
    return 'gris';
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo es demasiado grande. Máximo 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setError(null);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const img = new Image();
      img.onload = async () => {
        try {
          const result = await analyzeImage(img);
          setAnalysisResult(result);
        } catch (err) {
          setError('Error al analizar la imagen');
        } finally {
          setIsAnalyzing(false);
        }
      };
      img.src = selectedImage;
    } catch (err) {
      setError('Error al procesar la imagen');
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Análisis de Imágenes con IA</h3>
        <p className="text-gray-600">Sube una imagen para detectar objetos, emociones y colores</p>
      </div>

      {/* Upload Area */}
      {!selectedImage && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Arrastra una imagen aquí
          </p>
          <p className="text-gray-500 mb-4">o</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Seleccionar archivo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
          />
          <p className="text-xs text-gray-400 mt-2">
            Formatos soportados: JPG, PNG, GIF (máx. 10MB)
          </p>
        </div>
      )}

      {/* Selected Image */}
      {selectedImage && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              className="w-full max-h-96 object-contain rounded-lg border"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  Analizar Imagen
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
        >
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            <div className="flex items-center text-green-600 mb-4">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Análisis completado</span>
            </div>

            {/* Objects Detected */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Objetos Detectados</h4>
              <div className="space-y-2">
                {analysisResult.objects.map((obj, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 capitalize">{obj.class}</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${obj.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round(obj.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotions */}
            {analysisResult.emotions && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Emociones Detectadas</h4>
                <div className="space-y-2">
                  {analysisResult.emotions.map((emotion, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize">{emotion.emotion}</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${emotion.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {Math.round(emotion.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Colores Dominantes</h4>
              <div className="grid grid-cols-2 gap-2">
                {analysisResult.colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-gray-700 capitalize text-sm">
                      {color.color} ({color.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Información de la Imagen</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Dimensiones: {analysisResult.metadata.size}</p>
                <p>Ancho: {analysisResult.metadata.width}px</p>
                <p>Alto: {analysisResult.metadata.height}px</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageAnalysis;