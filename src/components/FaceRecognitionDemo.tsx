import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CheckCircle, School, Loader, Camera, Play, RotateCcw, Sparkles, Zap, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaceRecognitionDemo = () => {
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState(false);
  const [student, setStudent] = useState<{name: string; grade: string; code: string} | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);

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

    setScanning(true);
    setRecognized(false);
    setStudent(null);
    setScanProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate recognition after 3 seconds
    setTimeout(() => {
      setRecognized(true);
      setScanning(false);
      setStudent({
        name: "María Rodríguez",
        grade: "8vo Grado B",
        code: "MAR2024"
      });
      setShowStats(true);
      setScanProgress(100);
    }, 3000);
  }, [hasPermission]);

  const resetDemo = () => {
    setScanning(false);
    setRecognized(false);
    setStudent(null);
    setScanProgress(0);
    setShowStats(false);
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <School className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">AsistoYA Demo</h3>
              <p className="text-blue-100">Sistema de Reconocimiento Facial</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-xs text-blue-200">Precisión</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">< 1s</div>
              <div className="text-xs text-blue-200">Velocidad</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Camera Area */}
        <div className="relative mb-6">
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            {!scanning && !recognized && !hasPermission && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg)',
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center text-white"
                  >
                    <Camera className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                    <h4 className="text-xl font-semibold mb-2">Acceso a Cámara Requerido</h4>
                    <p className="text-blue-200 mb-6">Para comenzar la demostración, necesitamos acceso a tu cámara</p>
                    <motion.button
                      onClick={requestCameraPermission}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Permitir Acceso a la Cámara
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            )}

            {hasPermission && !scanning && !recognized && (
              <div className="absolute inset-0">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-gray-800 font-medium text-center">
                      Cámara lista - Haz clic en "Iniciar Escaneo" para comenzar
                    </p>
                  </div>
                </div>
              </div>
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
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 bg-blue-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Scanning Frame */}
                      <div className="w-64 h-64 border-4 border-blue-400 rounded-lg relative">
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
                        
                        {/* Scanning Line */}
                        <motion.div
                          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                          animate={{ y: [0, 256, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-800 font-medium">Escaneando rostro...</span>
                        <span className="text-blue-600 font-bold">{scanProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
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
                
                {/* Success Overlay */}
                <div className="absolute inset-0 bg-green-500/20">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center"
                        >
                          <CheckCircle className="text-green-600 w-12 h-12" />
                        </motion.div>
                        
                        <motion.h4
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl font-bold text-gray-900 mb-2"
                        >
                          ¡Estudiante Identificado!
                        </motion.h4>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-3"
                        >
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Nombre</p>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Clase</p>
                            <p className="font-semibold text-gray-900">{student.grade}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Código</p>
                            <p className="font-mono font-semibold text-blue-600">{student.code}</p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-sm text-blue-600">Asistencia registrada</p>
                            <p className="font-semibold text-blue-900">{new Date().toLocaleTimeString()}</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <motion.button
            onClick={startScan}
            disabled={scanning || !hasPermission}
            className={`flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              scanning || !hasPermission
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
            }`}
            whileHover={!scanning && hasPermission ? { scale: 1.05 } : {}}
            whileTap={!scanning && hasPermission ? { scale: 0.95 } : {}}
          >
            {scanning ? (
              <>
                <Loader className="animate-spin mr-3 h-6 w-6" />
                Escaneando...
              </>
            ) : (
              <>
                <Play className="mr-3 h-6 w-6" />
                Iniciar Escaneo
              </>
            )}
          </motion.button>

          {(recognized || scanning) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={resetDemo}
              className="flex items-center px-6 py-4 rounded-xl font-semibold text-lg bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Reiniciar
            </motion.button>
          )}
        </div>

        {/* Success Features */}
        <AnimatePresence>
          {recognized && student && showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Notification Sent */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-green-900">Notificación Enviada</h5>
                </div>
                <p className="text-green-800">
                  Se ha enviado una notificación automática a los padres de {student.name} informando su llegada a la escuela a las {new Date().toLocaleTimeString()}.
                </p>
              </div>

              {/* Gamification System */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h5 className="font-semibold text-purple-900">Sistema de Gamificación</h5>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">🔥 15</div>
                    <p className="text-sm text-gray-600">Racha de días</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">⭐ 750</div>
                    <p className="text-sm text-gray-600">Puntos acumulados</p>
                  </div>
                </div>
                <p className="text-purple-700 text-sm mt-3">
                  ¡Mantén tu asistencia perfecta para ganar más puntos y desbloquear recompensas!
                </p>
              </div>

              {/* Statistics */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-blue-900">Estadísticas de Asistencia</h5>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <p className="text-sm text-gray-600">Este mes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">22</div>
                    <p className="text-sm text-gray-600">Días presente</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <p className="text-sm text-gray-600">Día ausente</p>
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <p className="text-blue-700 text-sm mt-3">
                  Los reportes detallados están disponibles en el panel de padres y profesores.
                </p>
              </div>

              {/* Real-time Features */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <Zap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h5 className="font-semibold text-indigo-900">Características en Tiempo Real</h5>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-gray-700">Velocidad de reconocimiento</span>
                    <span className="font-semibold text-indigo-600">< 1 segundo</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-gray-700">Precisión del sistema</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-gray-700">Notificación a padres</span>
                    <span className="font-semibold text-blue-600">Instantánea</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FaceRecognitionDemo;