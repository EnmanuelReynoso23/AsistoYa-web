import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const FaceRecognitionDemo = () => {
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState(false);
  const [student, setStudent] = useState<{name: string; grade: string} | null>(null);
  
  const startScan = () => {
    setScanning(true);
    setRecognized(false);
    setStudent(null);
    
    setTimeout(() => {
      setRecognized(true);
      setScanning(false);
      setStudent({
        name: "María Rodríguez",
        grade: "8vo Grado B"
      });
    }, 3000);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl my-8 transform transition-all hover:shadow-xl">
      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Demostración de Reconocimiento Facial</h3>
          <p className="text-gray-600">Prueba cómo funciona nuestro sistema de asistencia automatizado</p>
        </div>
        
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6 shadow-inner">
          {!scanning && !recognized && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg" 
                alt="Estudiante dominicano" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center">
                <p className="text-white text-lg font-medium mb-2 text-shadow">Haga clic en 'Iniciar Escaneo' para comenzar</p>
              </div>
            </div>
          )}
          
          {scanning && (
            <div className="absolute inset-0">
              <div className="w-full h-full relative">
                <img 
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg" 
                  alt="Estudiante dominicano" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 border-4 border-blue-400 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-56 h-56 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="bg-blue-600 text-white py-2 px-4 rounded-full inline-block animate-pulse shadow-lg">
                      Escaneando...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {recognized && student && (
            <div className="absolute inset-0">
              <div className="w-full h-full relative">
                <img 
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg" 
                  alt="Estudiante dominicano" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-500 bg-opacity-20 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all">
                    <div className="flex items-center justify-center mb-4">
                      <CheckCircle className="text-green-500 w-10 h-10 mr-2" />
                      <h4 className="text-2xl font-bold text-gray-900">¡Estudiante Identificado!</h4>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-lg"><strong>Nombre:</strong> {student.name}</p>
                      <p className="text-lg"><strong>Clase:</strong> {student.grade}</p>
                      <p className="text-sm text-gray-600 mt-2">Asistencia registrada: {new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={startScan}
            disabled={scanning}
            className={`px-6 py-3 rounded-lg text-white font-medium transform transition-all ${
              scanning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {scanning ? 'Escaneando...' : recognized ? 'Escanear Nuevamente' : 'Iniciar Escaneo'}
          </button>
        </div>
        
        {recognized && student && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 shadow-inner">
            <p className="text-green-800 text-center">
              Se ha enviado una notificación a los padres de {student.name} informando su llegada a la escuela.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognitionDemo;