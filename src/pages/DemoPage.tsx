import React, { useState } from 'react';
import FaceRecognitionDemo from '../components/FaceRecognitionDemo';
import ParentAppDemo from '../components/ParentAppDemo';
import AdminDashboard from '../components/AdminDashboard';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('facial');
  
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
                <p className="text-gray-600 mb-8 max-w-2xl text-center">
                  Nuestra tecnología de reconocimiento facial identifica a los estudiantes al entrar a la escuela, registrando automáticamente su asistencia.
                </p>
                <FaceRecognitionDemo />
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