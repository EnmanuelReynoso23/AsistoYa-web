import { useState } from 'react';
import { motion } from 'framer-motion';
import FaceRecognitionDemo from '../components/FaceRecognitionDemo';
import RealTimeFaceRecognition from '../components/RealTimeFaceRecognition';
import ParentAppDemo from '../components/ParentAppDemo';
import AdminDashboard from '../components/AdminDashboard';
import VoiceRecognition from '../components/AIDemo/VoiceRecognition';
import ImageAnalysis from '../components/AIDemo/ImageAnalysis';
import ChatBot from '../components/AIDemo/ChatBot';
import NLPProcessor from '../components/AIDemo/NLPProcessor';
import { 
  Mic, 
  Eye, 
  MessageCircle, 
  Brain, 
  Camera, 
  Users, 
  BarChart3,
  Sparkles,
  Zap,
  Bot
} from 'lucide-react';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('ai-features');
  const [faceRecognitionMode, setFaceRecognitionMode] = useState('realtime');
  
  const aiFeatures = [
    {
      id: 'voice',
      name: 'Reconocimiento de Voz',
      icon: <Mic className="h-6 w-6" />,
      description: 'Comandos de voz para control del sistema',
      component: <VoiceRecognition />
    },
    {
      id: 'image',
      name: 'Análisis de Imágenes',
      icon: <Eye className="h-6 w-6" />,
      description: 'Detección de objetos y análisis visual',
      component: <ImageAnalysis />
    },
    {
      id: 'chatbot',
      name: 'Chatbot Inteligente',
      icon: <MessageCircle className="h-6 w-6" />,
      description: 'Asistente virtual para consultas',
      component: <ChatBot />
    },
    {
      id: 'nlp',
      name: 'Procesamiento de Lenguaje',
      icon: <Brain className="h-6 w-6" />,
      description: 'Análisis de sentimientos y texto',
      component: <NLPProcessor />
    }
  ];

  const [selectedAIFeature, setSelectedAIFeature] = useState(aiFeatures[0]);
  
  return (
    <div className="pt-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 mr-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Demostración Interactiva con IA
            </h1>
          </div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Experimenta las funcionalidades avanzadas de AsistoYA potenciadas por inteligencia artificial
          </p>
        </motion.div>
        
        {/* Navigation Tabs */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('ai-features')}
                className={`${
                  activeTab === 'ai-features'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              >
                <div className="flex items-center justify-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Funciones de IA
                </div>
              </button>
              <button
                onClick={() => setActiveTab('facial')}
                className={`${
                  activeTab === 'facial'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              >
                <div className="flex items-center justify-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Reconocimiento Facial
                </div>
              </button>
              <button
                onClick={() => setActiveTab('parent')}
                className={`${
                  activeTab === 'parent'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              >
                <div className="flex items-center justify-center">
                  <Users className="h-5 w-5 mr-2" />
                  App para Padres
                </div>
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`${
                  activeTab === 'admin'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              >
                <div className="flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Panel Administrativo
                </div>
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* AI Features Tab */}
            {activeTab === 'ai-features' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center mb-4">
                    <Zap className="h-8 w-8 mr-3" />
                    <div>
                      <h2 className="text-2xl font-bold">Inteligencia Artificial Integrada</h2>
                      <p className="text-blue-100">
                        Experimenta las capacidades de IA que potencian AsistoYA
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-2xl font-bold">4</div>
                      <div className="text-sm">Tecnologías IA</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-2xl font-bold">99%</div>
                      <div className="text-sm">Precisión</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm">Disponibilidad</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-2xl font-bold">Real-time</div>
                      <div className="text-sm">Procesamiento</div>
                    </div>
                  </div>
                </div>

                {/* AI Feature Selection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {aiFeatures.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => setSelectedAIFeature(feature)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAIFeature.id === feature.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`rounded-full p-3 mb-3 ${
                        selectedAIFeature.id === feature.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.name}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Selected AI Feature Demo */}
                <motion.div
                  key={selectedAIFeature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedAIFeature.component}
                </motion.div>
              </motion.div>
            )}
            
            {/* Facial Recognition Tab */}
            {activeTab === 'facial' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white mb-6 w-full">
                  <h2 className="text-2xl font-bold mb-2">Sistema de Reconocimiento Facial</h2>
                  <p className="text-green-100">
                    Tecnología avanzada para identificación automática de estudiantes
                  </p>
                </div>

                {/* Face Recognition Mode Toggle */}
                <div className="mb-6 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFaceRecognitionMode('realtime')}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                      faceRecognitionMode === 'realtime'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    🚀 Sistema Completo (Tiempo Real)
                  </button>
                  <button
                    onClick={() => setFaceRecognitionMode('demo')}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                      faceRecognitionMode === 'demo'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    👁️ Demo Simulado
                  </button>
                </div>

                {faceRecognitionMode === 'realtime' ? (
                  <div className="w-full">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">
                        🎯 Sistema de Reconocimiento Facial Completo
                      </h3>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>✅ Reconocimiento facial real en tiempo real a 60fps</p>
                        <p>✅ Registro y gestión de estudiantes con base de datos local</p>
                        <p>✅ Detección múltiple de rostros simultáneos</p>
                        <p>✅ Registro automático de asistencia</p>
                        <p>✅ Configuración de sensibilidad ajustable</p>
                        <p>✅ Exportación de datos y reportes</p>
                      </div>
                    </div>
                    <RealTimeFaceRecognition />
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        📋 Demo de Simulación
                      </h3>
                      <p className="text-sm text-yellow-700">
                        Esta es una simulación que muestra la interfaz y flujo de trabajo del sistema.
                      </p>
                    </div>
                    <FaceRecognitionDemo />
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Parent App Tab */}
            {activeTab === 'parent' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white mb-6 w-full">
                  <h2 className="text-2xl font-bold mb-2">Aplicación para Padres</h2>
                  <p className="text-purple-100">
                    Mantente conectado con la educación de tus hijos en tiempo real
                  </p>
                </div>
                <ParentAppDemo />
              </motion.div>
            )}
            
            {/* Admin Dashboard Tab */}
            {activeTab === 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-6 text-white mb-6">
                  <h2 className="text-2xl font-bold mb-2">Panel de Control Administrativo</h2>
                  <p className="text-indigo-100">
                    Gestión completa y análisis de datos para administradores escolares
                  </p>
                </div>
                <AdminDashboard />
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para revolucionar la asistencia escolar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Implementa AsistoYA en tu institución y experimenta el futuro de la gestión educativa con tecnología de vanguardia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#contact" 
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Solicitar Demostración Completa
            </a>
            <a 
              href="/for-schools" 
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              Ver Planes y Precios
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage;