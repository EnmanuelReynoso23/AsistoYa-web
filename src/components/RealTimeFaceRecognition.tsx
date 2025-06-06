import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { CheckCircle, UserPlus, Users, Settings, Download } from 'lucide-react';
import { faceApiService, StudentFace, RecognitionResult } from '../services/faceApiService';
import { studentDatabase } from '../services/studentDatabase';

interface RecognizedStudent {
  student: StudentFace;
  confidence: number;
  timestamp: Date;
  box: { x: number; y: number; width: number; height: number };
}

interface UnknownFace {
  id: string;
  box: { x: number; y: number; width: number; height: number };
  descriptor: Float32Array;
  timestamp: Date;
}

const RealTimeFaceRecognition: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [recognizedStudents, setRecognizedStudents] = useState<RecognizedStudent[]>([]);
  const [unknownFaces, setUnknownFaces] = useState<UnknownFace[]>([]);
  const [knownStudents, setKnownStudents] = useState<StudentFace[]>([]);
  const [processingFps, setProcessingFps] = useState(0);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedUnknownFace, setSelectedUnknownFace] = useState<UnknownFace | null>(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(0.6);
  const [notificationsSent, setNotificationsSent] = useState(false);

  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastProcessTimeRef = useRef<number>(0);
  const fpsCounterRef = useRef<number[]>([]);
  const attendanceLogRef = useRef<Set<string>>(new Set());

  // Video constraints for optimal performance
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
    frameRate: { ideal: 60, max: 60 }
  };

  // Load models and students on component mount
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        await faceApiService.loadModels();
        setModelsLoaded(true);
        
        await studentDatabase.init();
        const students = await studentDatabase.getAllStudents();
        setKnownStudents(students);
        
        faceApiService.setRecognitionThreshold(threshold);
      } catch (error) {
        console.error('Error initializing system:', error);
        setModelError('Error al inicializar el sistema de reconocimiento facial');
      }
    };

    initializeSystem();
  }, [threshold]);

  // Main processing loop for real-time recognition
  const processFrame = useCallback(async () => {
    if (!isActive || !webcamRef.current || !canvasRef.current || !modelsLoaded) {
      return;
    }

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) {
      return;
    }

    const currentTime = performance.now();
    const timeSinceLastProcess = currentTime - lastProcessTimeRef.current;

    // Process every 3rd frame (~20fps actual processing)
    if (timeSinceLastProcess < 50) { // 50ms = 20fps
      animationFrameRef.current = requestAnimationFrame(processFrame);
      return;
    }

    try {
      // Process video frame
      const results = await faceApiService.processVideoFrame(video, knownStudents);
      
      // Update canvas with overlays
      drawOverlays(results);
      
      // Update recognized students and handle attendance
      updateRecognizedStudents(results);
      
      // Update FPS counter
      updateFpsCounter(currentTime);
      
      lastProcessTimeRef.current = currentTime;
    } catch (error) {
      console.error('Error processing frame:', error);
    }

    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [isActive, modelsLoaded, knownStudents]);
  // Draw bounding boxes and names on canvas overlay
  const drawOverlays = (results: RecognitionResult[]) => {
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;
    
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Update unknown faces list
    const newUnknownFaces: UnknownFace[] = [];

    // Draw overlays for each detected face
    results.forEach((result, index) => {
      const { box, student, confidence, isMatch, descriptor } = result;
      
      // Scale box coordinates to canvas size
      const scaleX = canvas.width / video.videoWidth;
      const scaleY = canvas.height / video.videoHeight;
      
      const x = box.x * scaleX;
      const y = box.y * scaleY;
      const width = box.width * scaleX;
      const height = box.height * scaleY;

      if (isMatch && student) {
        // Known student - draw green box
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw name and confidence
        const text = `${student.name} (${Math.round(confidence * 100)}%)`;
        const fontSize = Math.max(16, width / 10);
        
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x, y - fontSize - 10, ctx.measureText(text).width + 10, fontSize + 10);
        
        ctx.fillStyle = '#000000';
        ctx.fillText(text, x + 5, y - 5);
      } else if (descriptor) {
        // Unknown face - draw red box and add to unknown faces
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Add to unknown faces list
        const unknownFace: UnknownFace = {
          id: `unknown_${Date.now()}_${index}`,
          box: { x: box.x, y: box.y, width: box.width, height: box.height },
          descriptor: descriptor,
          timestamp: new Date()
        };
        newUnknownFaces.push(unknownFace);

        // Draw "Desconocido" text
        const text = 'Desconocido - Clic para asignar';
        ctx.font = '16px Arial';
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x, y - 25, ctx.measureText(text).width + 10, 20);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, x + 5, y - 10);
      }
    });

    // Update unknown faces state
    setUnknownFaces(newUnknownFaces);
  };

  // Update the list of currently recognized students
  const updateRecognizedStudents = (results: RecognitionResult[]) => {
    const currentTime = new Date();
    const newRecognized: RecognizedStudent[] = [];

    results.forEach((result) => {
      if (result.isMatch && result.student) {
        newRecognized.push({
          student: result.student,
          confidence: result.confidence,
          timestamp: currentTime,
          box: result.box
        });

        // Record attendance (only once per day per student)
        handleAttendance(result.student, result.confidence);
      }
    });

    setRecognizedStudents(newRecognized);
  };

  // Handle attendance recording
  const handleAttendance = async (student: StudentFace, confidence: number) => {
    const today = new Date().toISOString().split('T')[0];
    const attendanceKey = `${student.id}_${today}`;

    if (!attendanceLogRef.current.has(attendanceKey)) {
      attendanceLogRef.current.add(attendanceKey);
      
      try {
        await studentDatabase.recordAttendance(student.id, confidence);
        await studentDatabase.updateLastSeen(student.id);
        console.log(`Attendance recorded for ${student.name}`);
      } catch (error) {
        console.error('Error recording attendance:', error);
      }
    }
  };

  // Update FPS counter
  const updateFpsCounter = (currentTime: number) => {
    fpsCounterRef.current.push(currentTime);
    
    // Keep only last second of frame times
    const oneSecondAgo = currentTime - 1000;
    fpsCounterRef.current = fpsCounterRef.current.filter(time => time > oneSecondAgo);
    
    setProcessingFps(fpsCounterRef.current.length);
  };

  // Start/stop recognition
  const toggleRecognition = () => {
    if (isActive) {
      setIsActive(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setRecognizedStudents([]);
    } else {
      setIsActive(true);
      lastProcessTimeRef.current = performance.now();
      processFrame();
    }
  };

  // Register new student
  const registerStudent = async () => {
    if (!newStudentName.trim()) {
      setRegistrationError('Por favor ingresa un nombre');
      return;
    }

    if (!webcamRef.current?.video) {
      setRegistrationError('Cámara no disponible');
      return;
    }

    try {
      const video = webcamRef.current.video;
      const descriptor = await faceApiService.extractFaceDescriptor(video);
      
      if (!descriptor) {
        setRegistrationError('No se detectó un rostro válido. Asegúrate de estar frente a la cámara.');
        return;
      }

      const student = await studentDatabase.addStudent(newStudentName.trim(), descriptor);
      setKnownStudents(prev => [...prev, student]);
      setNewStudentName('');
      setShowRegistration(false);
      setRegistrationError(null);
      
      console.log(`Student ${student.name} registered successfully`);
    } catch (error) {
      console.error('Error registering student:', error);
      setRegistrationError('Error al registrar estudiante');
    }
  };

  // Handle canvas click to select unknown face for naming
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;
    
    if (!canvas || !video || unknownFaces.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    // Check if click was on any unknown face
    for (const unknownFace of unknownFaces) {
      const { box } = unknownFace;
      const videoScaleX = canvas.width / video.videoWidth;
      const videoScaleY = canvas.height / video.videoHeight;
      
      const scaledX = box.x * videoScaleX;
      const scaledY = box.y * videoScaleY;
      const scaledWidth = box.width * videoScaleX;
      const scaledHeight = box.height * videoScaleY;

      if (clickX >= scaledX && clickX <= scaledX + scaledWidth &&
          clickY >= scaledY && clickY <= scaledY + scaledHeight) {
        // Clicked on this unknown face
        setSelectedUnknownFace(unknownFace);
        setShowRegistration(true);
        setIsActive(false); // Pause recognition while naming
        break;
      }
    }
  };

  // Register student from unknown face
  const registerStudentFromUnknownFace = async () => {
    if (!newStudentName.trim() || !selectedUnknownFace) {
      setRegistrationError('Por favor ingresa un nombre válido');
      return;
    }

    try {
      const student = await studentDatabase.addStudent(newStudentName.trim(), selectedUnknownFace.descriptor);
      setKnownStudents(prev => [...prev, student]);
      setNewStudentName('');
      setShowRegistration(false);
      setSelectedUnknownFace(null);
      setRegistrationError(null);
      setIsActive(true); // Resume recognition
      
      console.log(`Student ${student.name} registered successfully with code ${student.id}`);
    } catch (error) {
      console.error('Error registering student:', error);
      setRegistrationError('Error al registrar estudiante');
    }
  };
  // Send notifications to parents app
  const sendNotificationsToParents = () => {
    if (recognizedStudents.length === 0) {
      alert('No hay estudiantes registrados para enviar notificaciones');
      return;
    }

    // Crear evento personalizado para comunicar con ParentAppDemo
    const notificationData = recognizedStudents.map(student => ({
      id: `notif_${Date.now()}_${student.student.id}`,
      studentId: student.student.id,
      studentName: student.student.name,
      studentCode: student.student.code,
      type: 'arrival' as const,
      message: `${student.student.name} ${student.student.code ? `(${student.student.code}) ` : ''}llegó a la escuela`,
      timestamp: student.timestamp,
      read: false,
      confidence: student.confidence
    }));

    // Enviar evento personalizado
    window.dispatchEvent(new CustomEvent('newAttendanceNotifications', {
      detail: notificationData
    }));

    setNotificationsSent(true);
    
    // Reset after 3 seconds
    setTimeout(() => setNotificationsSent(false), 3000);
    
    console.log('Notificaciones enviadas a padres:', notificationData);
    alert(`Se enviaron ${notificationData.length} notificación(es) a la app de padres`);
  };

  // Export data
  const exportData = async () => {
    try {
      const data = await studentDatabase.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `asistoya-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  if (modelError) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error del Sistema</p>
          <p>{modelError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recargar Página
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">AsistoYA - Reconocimiento Facial</h2>
            <p className="text-blue-100">Sistema de asistencia en tiempo real</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm opacity-90">FPS Procesamiento</div>
              <div className="text-xl font-bold">{processingFps}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Estudiantes</div>
              <div className="text-xl font-bold">{knownStudents.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleRecognition}
              disabled={!modelsLoaded}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } ${!modelsLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isActive ? 'Detener Reconocimiento' : 'Iniciar Reconocimiento'}
            </button>            <button
              onClick={() => setShowRegistration(!showRegistration)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Registrar Estudiante
            </button>

            {recognizedStudents.length > 0 && (
              <button
                onClick={sendNotificationsToParents}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
                  notificationsSent
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                disabled={notificationsSent}
              >
                {notificationsSent ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Notificaciones Enviadas
                  </>
                ) : (
                  'Enviar Notificaciones'
                )}
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <label className="text-sm">Sensibilidad:</label>
              <input
                type="range"
                min="0.3"
                max="0.9"
                step="0.1"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm w-8">{threshold}</span>
            </div>

            <button
              onClick={exportData}
              className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </button>
          </div>
        </div>        {/* Student Registration */}
        {showRegistration && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">
              {selectedUnknownFace ? 'Asignar Nombre a Rostro Detectado' : 'Registrar Nuevo Estudiante'}
            </h3>
            {selectedUnknownFace && (
              <p className="text-sm text-gray-600 mb-3">
                Se detectó un rostro desconocido. Ingresa el nombre del estudiante para registrarlo.
              </p>
            )}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Nombre del estudiante (ej: Enmanuel Reynoso)"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (selectedUnknownFace ? registerStudentFromUnknownFace() : registerStudent())}
              />
              <button
                onClick={selectedUnknownFace ? registerStudentFromUnknownFace : registerStudent}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {selectedUnknownFace ? 'Asignar Nombre' : 'Registrar'}
              </button>
              <button
                onClick={() => {
                  setShowRegistration(false);
                  setRegistrationError(null);
                  setNewStudentName('');
                  setSelectedUnknownFace(null);
                  if (!selectedUnknownFace) {
                    setIsActive(true); // Resume recognition if we were paused
                  }
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
            {registrationError && (
              <p className="mt-2 text-red-600 text-sm">{registrationError}</p>
            )}
          </div>
        )}
      </div>

      {/* Video and Recognition Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Video Feed */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              className="w-full rounded-lg shadow-lg"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full cursor-pointer"
              style={{ maxHeight: '500px' }}
              onClick={handleCanvasClick}
            />
            
            {!modelsLoaded && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p>Cargando modelos...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recognition Results */}
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Estudiantes Reconocidos
            </h3>
            
            {recognizedStudents.length === 0 ? (
              <p className="text-gray-600 text-sm">
                {isActive ? 'Buscando estudiantes...' : 'Inicia el reconocimiento para ver estudiantes'}
              </p>
            ) : (
              <div className="space-y-2">
                {recognizedStudents.map((recognized, index) => (
                  <div key={`${recognized.student.id}-${index}`} className="bg-white p-3 rounded border">
                    <div className="flex items-center justify-between">                      <div>
                        <div className="font-medium text-green-800">{recognized.student.name}</div>
                        {recognized.student.code && (
                          <div className="text-xs text-blue-600 font-mono">
                            {recognized.student.code}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">
                          Confianza: {Math.round(recognized.confidence * 100)}%
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Status */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3">Estado del Sistema</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Modelos:</span>
                <span className={modelsLoaded ? 'text-green-600' : 'text-yellow-600'}>
                  {modelsLoaded ? 'Cargados' : 'Cargando...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Reconocimiento:</span>
                <span className={isActive ? 'text-green-600' : 'text-gray-600'}>
                  {isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>FPS Procesamiento:</span>
                <span className="text-blue-600">{processingFps}</span>
              </div>
              <div className="flex justify-between">
                <span>Estudiantes:</span>
                <span className="text-blue-600">{knownStudents.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeFaceRecognition;
