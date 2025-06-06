import React, { useState } from 'react';
import { Brain, Loader, CheckCircle, AlertCircle, TrendingUp, Heart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResult {
  sentiment: {
    label: 'positivo' | 'negativo' | 'neutral';
    confidence: number;
    score: number;
  };
  emotions: Array<{
    emotion: string;
    confidence: number;
  }>;
  keywords: Array<{
    word: string;
    relevance: number;
    category: string;
  }>;
  summary: string;
  language: string;
  readability: {
    level: string;
    score: number;
  };
}

const NLPProcessor: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (text: string): Promise<AnalysisResult> => {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simple sentiment analysis
    const positiveWords = ['bueno', 'excelente', 'fantástico', 'genial', 'perfecto', 'increíble', 'maravilloso', 'feliz', 'contento', 'satisfecho'];
    const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'triste', 'enojado', 'frustrado', 'decepcionado', 'molesto'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });

    let sentiment: AnalysisResult['sentiment'];
    if (positiveCount > negativeCount) {
      sentiment = { label: 'positivo', confidence: 0.85, score: 0.7 };
    } else if (negativeCount > positiveCount) {
      sentiment = { label: 'negativo', confidence: 0.82, score: -0.6 };
    } else {
      sentiment = { label: 'neutral', confidence: 0.75, score: 0.1 };
    }

    // Extract keywords
    const commonWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'las', 'una', 'como', 'pero', 'sus', 'me', 'ya', 'muy', 'mi', 'si', 'sin', 'sobre', 'este', 'ser', 'tiene', 'todo', 'esta', 'era', 'han', 'hay', 'más', 'puede', 'fue', 'hasta', 'donde', 'quien', 'desde', 'todos', 'durante', 'tanto', 'menos', 'según', 'entre'];
    
    const wordFreq = new Map<string, number>();
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
      if (cleanWord.length > 3 && !commonWords.includes(cleanWord)) {
        wordFreq.set(cleanWord, (wordFreq.get(cleanWord) || 0) + 1);
      }
    });

    const keywords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, freq]) => ({
        word,
        relevance: Math.min(freq / words.length * 10, 1),
        category: getWordCategory(word)
      }));

    // Generate emotions based on content
    const emotions = generateEmotions(text, sentiment.label);

    // Generate summary
    const summary = generateSummary(text, sentiment.label);

    // Calculate readability
    const avgWordsPerSentence = words.length / (text.split(/[.!?]+/).length || 1);
    const readabilityScore = Math.max(0, Math.min(100, 100 - avgWordsPerSentence * 2));
    
    let readabilityLevel = 'Fácil';
    if (readabilityScore < 30) readabilityLevel = 'Muy difícil';
    else if (readabilityScore < 50) readabilityLevel = 'Difícil';
    else if (readabilityScore < 70) readabilityLevel = 'Moderado';

    return {
      sentiment,
      emotions,
      keywords,
      summary,
      language: 'Español',
      readability: {
        level: readabilityLevel,
        score: readabilityScore
      }
    };
  };

  const getWordCategory = (word: string): string => {
    const categories = {
      'tecnología': ['sistema', 'tecnología', 'software', 'aplicación', 'digital', 'automático'],
      'educación': ['escuela', 'estudiante', 'profesor', 'clase', 'educación', 'aprendizaje'],
      'familia': ['padre', 'madre', 'hijo', 'familia', 'casa', 'hogar'],
      'emociones': ['feliz', 'triste', 'contento', 'preocupado', 'tranquilo', 'nervioso']
    };

    for (const [category, words] of Object.entries(categories)) {
      if (words.some(w => word.includes(w))) return category;
    }
    return 'general';
  };

  const generateEmotions = (text: string, sentiment: string): AnalysisResult['emotions'] => {
    const baseEmotions = [
      { emotion: 'confianza', confidence: 0.7 },
      { emotion: 'interés', confidence: 0.6 },
      { emotion: 'curiosidad', confidence: 0.5 }
    ];

    if (sentiment === 'positivo') {
      return [
        { emotion: 'alegría', confidence: 0.85 },
        { emotion: 'satisfacción', confidence: 0.78 },
        ...baseEmotions
      ];
    } else if (sentiment === 'negativo') {
      return [
        { emotion: 'preocupación', confidence: 0.82 },
        { emotion: 'frustración', confidence: 0.75 },
        ...baseEmotions
      ];
    }

    return baseEmotions;
  };

  const generateSummary = (text: string, sentiment: string): string => {
    const wordCount = text.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).length;
    
    if (sentiment === 'positivo') {
      return `Texto positivo de ${wordCount} palabras que expresa satisfacción y optimismo. El contenido muestra una actitud favorable hacia el tema tratado.`;
    } else if (sentiment === 'negativo') {
      return `Texto de ${wordCount} palabras con tono negativo que expresa preocupaciones o críticas. El contenido refleja una perspectiva desfavorable.`;
    }
    
    return `Texto neutral de ${wordCount} palabras con un tono equilibrado. El contenido presenta información de manera objetiva sin inclinaciones emocionales marcadas.`;
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Por favor ingresa algún texto para analizar');
      return;
    }

    if (inputText.length < 10) {
      setError('El texto debe tener al menos 10 caracteres');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysisResult = await analyzeText(inputText);
      setResult(analysisResult);
    } catch (err) {
      setError('Error al analizar el texto. Por favor, inténtalo de nuevo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positivo': return 'text-green-600 bg-green-100';
      case 'negativo': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positivo': return <TrendingUp className="h-5 w-5" />;
      case 'negativo': return <AlertCircle className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const exampleTexts = [
    'AsistoYA es una solución increíble que ha transformado completamente la gestión de asistencia en nuestra escuela. Los padres están muy contentos con las notificaciones en tiempo real.',
    'Estoy preocupado por la implementación del nuevo sistema. No estoy seguro de que funcione correctamente y los costos parecen muy altos para nuestro presupuesto.',
    'El sistema de reconocimiento facial presenta características técnicas avanzadas. La implementación requiere configuración específica y capacitación del personal administrativo.'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Procesamiento de Lenguaje Natural</h3>
        <p className="text-gray-600">Analiza sentimientos, emociones y extrae información clave del texto</p>
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto a analizar
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe o pega aquí el texto que quieres analizar..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {inputText.length}/1000 caracteres
            </span>
            <span className="text-xs text-gray-500">
              {inputText.split(/\s+/).filter(word => word.length > 0).length} palabras
            </span>
          </div>
        </div>

        {/* Example Texts */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Ejemplos:</p>
          <div className="space-y-2">
            {exampleTexts.map((example, index) => (
              <button
                key={index}
                onClick={() => setInputText(example)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              >
                {example.substring(0, 100)}...
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputText.trim()}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
            isAnalyzing || !inputText.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5 mr-2" />
              Analizar Texto
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
        >
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
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

            {/* Sentiment Analysis */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Análisis de Sentimientos</h4>
              <div className="flex items-center justify-between mb-3">
                <div className={`flex items-center px-3 py-1 rounded-full ${getSentimentColor(result.sentiment.label)}`}>
                  {getSentimentIcon(result.sentiment.label)}
                  <span className="ml-2 font-medium capitalize">{result.sentiment.label}</span>
                </div>
                <span className="text-sm text-gray-600">
                  Confianza: {Math.round(result.sentiment.confidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    result.sentiment.label === 'positivo' ? 'bg-green-500' :
                    result.sentiment.label === 'negativo' ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${result.sentiment.confidence * 100}%` }}
                />
              </div>
            </div>

            {/* Emotions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Emociones Detectadas</h4>
              <div className="space-y-2">
                {result.emotions.map((emotion, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 capitalize flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-pink-500" />
                      {emotion.emotion}
                    </span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
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

            {/* Keywords */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Palabras Clave</h4>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span className="font-medium">{keyword.word}</span>
                    <span className="ml-1 text-xs opacity-75">
                      ({Math.round(keyword.relevance * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary and Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Resumen</h4>
                <p className="text-gray-700 text-sm">{result.summary}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Información Adicional</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Idioma:</span>
                    <span className="text-gray-900">{result.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Legibilidad:</span>
                    <span className="text-gray-900">{result.readability.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Puntuación:</span>
                    <span className="text-gray-900">{Math.round(result.readability.score)}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NLPProcessor;