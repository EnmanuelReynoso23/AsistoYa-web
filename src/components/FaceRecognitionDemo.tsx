import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CheckCircle, School } from 'lucide-react';
import * as faceapi from 'face-api.js';

const FaceRecognitionDemo = () => {
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState(false);
  const [student, setStudent] = useState<{name: string; grade: string} | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error cargando modelos:', error);
      }
    };
    loadModels();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
    } catch (err) {
      setHasPermission(false);
      console.error('Error accediendo a la cámara:', err);
    }
  };

  const startScan = useCallback(async () => {
    if (!hasPermission) {
      await requestCameraPermission();
      return;
    }

    if (!modelsLoaded) {
      console.log('Modelos aún cargando...');
      return;
    }

    setScanning(true);
    setRecognized(false);
    setStudent(null);

    // Simulamos el reconocimiento facial después de 3 segundos
    setTimeout(() => {
      setRecognized(true);
      setScanning(false);
      setStudent({
        name: "María Rodríguez",
        grade: "8vo Grado B"
      });
    }, 3000);
  }, [hasPermission, modelsLoaded]);

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user"
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl my-8">
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <School className="h-12 w-12 text-blue-600 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">AsistoYA</h3>
          </div>
          <p className="text-gray-600">Prueba cómo funciona nuestro sistema de asistencia automatizado</p>
        </div>

        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6 shadow-inner">
          {!scanning && !recognized && !hasPermission && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg" 
                alt="Estudiante dominicano" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center">
                <p className="text-white text-lg font-medium mb-4 text-shadow">Para comenzar, necesitamos acceso a tu cámara</p>
                <button
                  onClick={requestCameraPermission}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Permitir Acceso a la Cámara
                </button>
              </div>
            </div>
          )}

          {hasPermission && !scanning && !recognized && (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />
          )}

          {scanning && (
            <div className="absolute inset-0">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
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
          )}

          {recognized && student && (
            <div className="absolute inset-0">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
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
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={startScan}
            disabled={scanning || !hasPermission}
            className={`px-6 py-3 rounded-lg text-white font-medium transform transition-all ${
              scanning || !hasPermission
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
          >
            {scanning ? 'Escaneando...' : recognized ? 'Escanear Nuevamente' : 'Iniciar Escaneo'}
          </button>
        </div>

        {recognized && student && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 shadow-inner">
              <p className="text-green-800 text-center">
                Se ha enviado una notificación a los padres de {student.name} informando su llegada a la escuela.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2">Sistema de Gamificación</h5>
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-800">Racha de Asistencia:</span>
                <span className="font-bold text-blue-900">🔥 15 días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800">Puntos Acumulados:</span>
                <span className="font-bold text-blue-900">⭐ 750 pts</span>
              </div>
              <div className="mt-2 text-sm text-blue-700">
                ¡Mantén tu asistencia perfecta para ganar más puntos y desbloquear recompensas!
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-900 mb-2">Reportes y Estadísticas</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-purple-800">Asistencia Este Mes:</span>
                  <span className="font-bold text-purple-900">98%</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <p className="text-sm text-purple-700 mt-2">
                  Los reportes detallados están disponibles en el panel de padres y profesores.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognitionDemo;