import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceRecognitionProps {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onResult, onError }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'success' | 'error'>('idle');
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Check if Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-ES';

      recognition.onstart = () => {
        setStatus('listening');
        setIsListening(true);
        startAudioVisualization();
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);

        if (finalTranscript) {
          setStatus('success');
          onResult?.(finalTranscript);
          setTimeout(() => setStatus('idle'), 2000);
        }
      };

      recognition.onerror = (event) => {
        setStatus('error');
        setIsListening(false);
        const errorMessage = `Error de reconocimiento: ${event.error}`;
        onError?.(errorMessage);
        setTimeout(() => setStatus('idle'), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        stopAudioVisualization();
        if (status === 'listening') {
          setStatus('idle');
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      stopAudioVisualization();
    };
  }, [onResult, onError, status]);

  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAudioLevel(0);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setConfidence(0);
      recognitionRef.current.start();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">
            Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Reconocimiento de Voz</h3>
        <p className="text-gray-600">Habla para registrar comandos de voz</p>
      </div>

      {/* Microphone Button with Audio Visualization */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={toggleListening}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 shadow-lg'
              : 'bg-blue-500 hover:bg-blue-600 shadow-md'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isListening ? (
            <MicOff className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
          
          {/* Audio Level Visualization */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white opacity-30"
              animate={{
                scale: [1, 1 + audioLevel * 0.5, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
          )}
        </motion.button>
      </div>

      {/* Status Indicator */}
      <div className="flex justify-center mb-4">
        <AnimatePresence mode="wait">
          {status === 'listening' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-blue-600"
            >
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              <span className="text-sm font-medium">Escuchando...</span>
            </motion.div>
          )}
          {status === 'processing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-yellow-600"
            >
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              <span className="text-sm font-medium">Procesando...</span>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-green-600"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">¡Reconocido!</span>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-red-600"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Error de reconocimiento</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-50 rounded-lg p-4 mb-4"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">Texto reconocido:</h4>
            {confidence > 0 && (
              <span className="text-xs text-gray-500">
                Confianza: {Math.round(confidence * 100)}%
              </span>
            )}
          </div>
          <p className="text-gray-700 italic">"{transcript}"</p>
          <button
            onClick={() => speakText(transcript)}
            className="mt-2 flex items-center text-blue-600 hover:text-blue-700 text-sm"
          >
            <Volume2 className="h-4 w-4 mr-1" />
            Reproducir
          </button>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500">
        <p>
          {isListening
            ? 'Habla claramente hacia el micrófono'
            : 'Haz clic en el micrófono para comenzar'}
        </p>
      </div>
    </div>
  );
};

export default VoiceRecognition;