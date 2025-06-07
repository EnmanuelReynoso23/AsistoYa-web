import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CheckCircle, School, Loader, Camera, Play, RotateCcw, Sparkles, Zap, Users, Clock, UserPlus, Edit3, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetectedFace {
  id: string;
  name: string | null;
  confidence: number;
  box: { x: number; y: number; width: number; height: number };
  timestamp: Date;
  isNaming: boolean;
}

const FaceRecognitionDemo = () => {
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState<Array<{name: string; time: Date; code: string}>>([]);
  const [newName, setNewName] = useState('');
  const [editingFaceId, setEditingFaceId] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Simulate face detection
  const detectFaces = useCallback(() => {
    if (!scanning || !webcamRef.current?.video) return;

    // Simulate detecting 1-3 faces randomly
    const numFaces = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0;
    const newFaces: DetectedFace[] = [];

    for (let i = 0; i < numFaces; i++) {
      // Random position for face detection box
      const x = Math.random() * 400 + 100;
      const y = Math.random() * 200 + 100;
      const width = 120 + Math.random() * 80;
      const height = 140 + Math.random() * 60;

      const faceId = `face_${Date.now()}_${i}`;
      
      // Check if this might be a known face (simulate recognition)
      const isKnownFace = Math.random() > 0.6;
      const knownNames = ['María Rodríguez', 'Juan Pérez', 'Ana García', 'Carlos Méndez', 'Sofía López'];
      
      newFaces.push({
        id: faceId,
        name: isKnownFace ? knownNames[Math.floor(Math.random() * knownNames.length)] : null,
        confidence: 0.85 + Math.random() * 0.14,
        box: { x, y, width, height },
        timestamp: new Date(),
        isNaming: false
      });
    }

    setDetectedFaces(newFaces);
    
    // Draw detection boxes on canvas
    drawDetectionBoxes(newFaces);
  }, [scanning]);

  const drawDetectionBoxes = (faces: DetectedFace[]) => {
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;
    
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size to match video
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    faces.forEach((face) => {
      const { box, name, confidence } = face;
      
      // Draw bounding box
      ctx.strokeStyle = name ? '#10B981' : '#EF4444'; // Green for known, red for unknown
      ctx.lineWidth = 3;
      ctx.strokeRect(box.x, box.y, box.width, box.height);

      // Draw name label background
      const label = name || 'Desconocido';
      const labelText = `${label} (${Math.round(confidence * 100)}%)`;
      
      ctx.font = '16px Arial';
      const textWidth = ctx.measureText(labelText).width;
      const labelHeight = 25;
      
      // Background for label
      ctx.fillStyle = name ? '#10B981' : '#EF4444';
      ctx.fillRect(box.x, box.y - labelHeight, textWidth + 10, labelHeight);
      
      // Label text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(labelText, box.x + 5, box.y - 8);

      // Draw corner markers
      const cornerSize = 20;
      ctx.strokeStyle = name ? '#10B981' : '#EF4444';
      ctx.lineWidth = 4;
      
      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(box.x, box.y + cornerSize);
      ctx.lineTo(box.x, box.y);
      ctx.lineTo(box.x + cornerSize, box.y);
      ctx.stroke();
      
      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(box.x + box.width - cornerSize, box.y);
      ctx.lineTo(box.x + box.width, box.y);
      ctx.lineTo(box.x + box.width, box.y + cornerSize);
      ctx.stroke();
      
      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(box.x, box.y + box.height - cornerSize);
      ctx.lineTo(box.x, box.y + box.height);
      ctx.lineTo(box.x + cornerSize, box.y + box.height);
      ctx.stroke();
      
      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(box.x + box.width - cornerSize, box.y + box.height);
      ctx.lineTo(box.x + box.width, box.y + box.height);
      ctx.lineTo(box.x + box.width, box.y + box.height - cornerSize);
      ctx.stroke();
    });
  };

  const startScan = useCallback(async () => {
    if (!hasPermission) {
      await requestCameraPermission();
      return;
    }

    setScanning(true);
    setRecognized(false);
    setDetectedFaces([]);
    setShowStats(true);

    // Start face detection simulation
    detectionIntervalRef.current = setInterval(detectFaces, 1000);
  }, [hasPermission, detectFaces]);

  const stopScan = () => {
    setScanning(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    
    // Process recognized faces for attendance
    const recognizedFaces = detectedFaces.filter(face => face.name);
    if (recognizedFaces.length > 0) {
      setRecognized(true);
      const newAttendance = recognizedFaces.map(face => ({
        name: face.name!,
        time: new Date(),
        code: generateStudentCode(face.name!)
      }));
      setAttendanceLog(prev => [...newAttendance, ...prev]);
    }
  };

  const generateStudentCode = (name: string): string => {
    const initials = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
    const year = new Date().getFullYear();
    return `${initials}${year}`;
  };

  const resetDemo = () => {
    setScanning(false);
    setRecognized(false);
    setDetectedFaces([]);
    setShowStats(false);
    setAttendanceLog([]);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!scanning) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if click was on any unknown face
    const clickedFace = detectedFaces.find(face => {
      if (face.name) return false; // Skip known faces
      
      const { box } = face;
      return clickX >= box.x && clickX <= box.x + box.width &&
             clickY >= box.y && clickY <= box.y + box.height;
    });

    if (clickedFace) {
      setEditingFaceId(clickedFace.id);
      setNewName('');
    }
  };

  const assignName = (faceId: string) => {
    if (!newName.trim()) return;

    setDetectedFaces(prev => prev.map(face => 
      face.id === faceId 
        ? { ...face, name: newName.trim(), isNaming: false }
        : face
    ));
    
    setEditingFaceId(null);
    setNewName('');
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  useEffect(() => {
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

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
              <h3 className="text-2xl font-bold">AsistoYA - Reconocimiento Facial</h3>
              <p className="text-blue-100">Sistema de detección y registro automático</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{detectedFaces.length}</div>
              <div className="text-xs text-blue-200">Rostros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{detectedFaces.filter(f => f.name).length}</div>
              <div className="text-xs text-blue-200">Reconocidos</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Camera Area */}
        <div className="relative mb-6">
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            {!hasPermission && (
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

            {hasPermission && (
              <div className="absolute inset-0">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
                
                {/* Canvas overlay for face detection boxes */}
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full cursor-pointer"
                  onClick={handleCanvasClick}
                />
                
                {/* Status overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-3 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${scanning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                        <span className="text-sm font-medium">
                          {scanning ? 'Detectando rostros...' : 'Sistema listo'}
                        </span>
                      </div>
                      <div className="text-sm">
                        {detectedFaces.length > 0 && `${detectedFaces.length} rostro(s) detectado(s)`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                {scanning && detectedFaces.some(f => !f.name) && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-yellow-500 bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-black">
                      <p className="text-sm font-medium text-center">
                        Haz clic en los rostros rojos para asignarles un nombre
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          {!scanning ? (
            <motion.button
              onClick={startScan}
              disabled={!hasPermission}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                !hasPermission
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
              }`}
              whileHover={hasPermission ? { scale: 1.05 } : {}}
              whileTap={hasPermission ? { scale: 0.95 } : {}}
            >
              <Play className="mr-3 h-6 w-6" />
              Iniciar Detección
            </motion.button>
          ) : (
            <motion.button
              onClick={stopScan}
              className="flex items-center px-8 py-4 rounded-xl font-semibold text-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="mr-3 h-6 w-6" />
              Detener y Registrar
            </motion.button>
          )}

          <motion.button
            onClick={resetDemo}
            className="flex items-center px-6 py-4 rounded-xl font-semibold text-lg bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reiniciar
          </motion.button>
        </div>

        {/* Face Naming Modal */}
        <AnimatePresence>
          {editingFaceId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setEditingFaceId(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-4">
                  <UserPlus className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Asignar Nombre al Rostro</h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Ingresa el nombre del estudiante para registrarlo en el sistema:
                </p>
                
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: María Rodríguez"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && assignName(editingFaceId)}
                />
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => assignName(editingFaceId)}
                    disabled={!newName.trim()}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingFaceId(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 flex items-center justify-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Information Sections */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Real-time Detection Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900">Estado de Detección en Tiempo Real</h5>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{detectedFaces.length}</div>
                    <p className="text-sm text-gray-600">Rostros detectados</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{detectedFaces.filter(f => f.name).length}</div>
                    <p className="text-sm text-gray-600">Identificados</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{detectedFaces.filter(f => !f.name).length}</div>
                    <p className="text-sm text-gray-600">Sin identificar</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{attendanceLog.length}</div>
                    <p className="text-sm text-gray-600">Asistencias</p>
                  </div>
                </div>
              </div>

              {/* Currently Detected Faces */}
              {detectedFaces.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900">Rostros Detectados Actualmente</h5>
                  </div>
                  
                  <div className="space-y-3">
                    {detectedFaces.map((face) => (
                      <div key={face.id} className={`border rounded-lg p-4 ${face.name ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {face.name || 'Rostro sin identificar'}
                            </div>
                            <div className="text-sm text-gray-600">
                              Confianza: {Math.round(face.confidence * 100)}%
                            </div>
                            <div className="text-xs text-gray-500">
                              Posición: {Math.round(face.box.x)}, {Math.round(face.box.y)}
                            </div>
                          </div>
                          <div className="text-right">
                            {face.name ? (
                              <div className="text-green-600 font-semibold">✓ Identificado</div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingFaceId(face.id);
                                  setNewName('');
                                }}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                              >
                                <Edit3 className="h-3 w-3 mr-1" />
                                Nombrar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attendance Log */}
              {attendanceLog.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 rounded-full p-2 mr-3">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900">Registro de Asistencia</h5>
                  </div>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {attendanceLog.map((entry, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{entry.name}</div>
                            <div className="text-sm text-blue-600 font-mono">{entry.code}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {entry.time.toLocaleTimeString()}
                            </div>
                            <div className="text-xs text-green-600">✓ Registrado</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Information */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <Zap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h5 className="font-semibold text-indigo-900">Información del Sistema</h5>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Tecnología</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Detección facial en tiempo real</li>
                      <li>• Reconocimiento biométrico</li>
                      <li>• Procesamiento local</li>
                      <li>• Algoritmos de IA avanzados</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Características</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Múltiples rostros simultáneos</li>
                      <li>• Asignación manual de nombres</li>
                      <li>• Registro automático</li>
                      <li>• Códigos únicos de estudiante</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Beneficios</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ahorro de tiempo</li>
                      <li>• Precisión garantizada</li>
                      <li>• Notificaciones automáticas</li>
                      <li>• Reportes detallados</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Usage Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 rounded-full p-2 mr-3">
                    <Sparkles className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h5 className="font-semibold text-yellow-900">Instrucciones de Uso</h5>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-semibold text-yellow-900 mb-2">Para Administradores:</h6>
                    <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                      <li>Inicia la detección facial</li>
                      <li>Observa los rostros detectados en pantalla</li>
                      <li>Haz clic en rostros rojos para asignar nombres</li>
                      <li>Detén la detección para registrar asistencia</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h6 className="font-semibold text-yellow-900 mb-2">Funcionalidades:</h6>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Cuadros verdes = Estudiantes conocidos</li>
                      <li>• Cuadros rojos = Rostros sin identificar</li>
                      <li>• Clic en rostros rojos para nombrar</li>
                      <li>• Registro automático al detener</li>
                    </ul>
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