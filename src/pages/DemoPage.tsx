import { useState } from 'react';
import FaceRecognitionDemo from '../components/FaceRecognitionDemo';
import RealTimeFaceRecognition from '../components/RealTimeFaceRecognition';
import ParentAppDemo from '../components/ParentAppDemo';
import AdminDashboard from '../components/AdminDashboard';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('facial');
  const [faceRecognitionMode, setFaceRecognitionMode] = useState('realtime');
  
  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Demostración Interactiva
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Experimenta las funcionalidades de AsistoYA para escuelas, padres y administradores.
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('facial')}
                className={`${
                  activeTab === 'facial'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Reconocimiento Facial
              </button>
              <button
                onClick={() => setActiveTab('parent')}
                className={`${
                  activeTab === 'parent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                App para Padres
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`${
                  activeTab === 'admin'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Panel de Administración
              </button>
            </nav>
          </div>
          
          <div className="p-4">
            {activeTab === 'facial' && (
              <div className="flex flex-col items-center">
                <p className="text-gray-600 mb-4 max-w-2xl text-center">
                  Nuestra tecnología de reconocimiento facial identifica a los estudiantes al entrar a la escuela, registrando automáticamente su asistencia.
                </p>

                {/* Face Recognition Mode Toggle */}
                <div className="mb-6 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFaceRecognitionMode('realtime')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      faceRecognitionMode === 'realtime'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    🚀 Sistema Completo (60fps)
                  </button>
                  <button
                    onClick={() => setFaceRecognitionMode('demo')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      faceRecognitionMode === 'demo'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    👁️ Demo Básico
                  </button>
                </div>

                {faceRecognitionMode === 'realtime' ? (
                  <div className="w-full">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">🎯 Sistema de Reconocimiento Facial Completo</h3>
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
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">📋 Demo de Simulación</h3>
                      <p className="text-sm text-yellow-700">
                        Esta es una simulación que muestra la interfaz y flujo de trabajo del sistema sin usar reconocimiento facial real.
                      </p>
                    </div>
                    <FaceRecognitionDemo />
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'parent' && (
              <div className="flex flex-col items-center">
                <p className="text-gray-600 mb-8 max-w-2xl text-center">
                  Los padres reciben notificaciones en tiempo real sobre la llegada y salida de sus hijos, además de acceso al historial de asistencia.
                </p>
                <ParentAppDemo />
              </div>
            )}
            
            {activeTab === 'admin' && (
              <div>
                <p className="text-gray-600 mb-8 max-w-2xl text-center mx-auto">
                  Los administradores y docentes pueden monitorear la asistencia escolar con estadísticas detalladas y reportes en tiempo real.
                </p>
                <AdminDashboard />
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">¿Listo para implementar AsistoYA en tu escuela?</p>
          <a href="/#contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Solicitar una Demostración Completa
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;