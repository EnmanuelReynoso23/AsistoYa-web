import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, CheckCircle, User, Clock, CreditCard, School, Sparkles, RotateCcw } from 'lucide-react';

interface StudentInfo {
  name: string;
  code: string;
  grade: string;
  arrivalTime: string;
}

const FaceRecognitionDemo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [student, setStudent] = useState<StudentInfo | null>(null);

  // Datos de ejemplo de estudiantes
  const studentDatabase = [
    {
      name: "María Elena Rodríguez",
      code: "MER2025",
      grade: "8vo Grado",
      arrivalTime: new Date().toLocaleTimeString('es-DO', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    },
    {
      name: "Ana Sofía García",
      code: "ASG2025", 
      grade: "7mo Grado",
      arrivalTime: new Date().toLocaleTimeString('es-DO', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    },
    {
      name: "Isabella Martínez",
      code: "IMO2025",
      grade: "9no Grado", 
      arrivalTime: new Date().toLocaleTimeString('es-DO', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    }
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setStudent(null);

    // Simular proceso de escaneo por 3 segundos
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Seleccionar estudiante aleatoria
      const randomStudent = studentDatabase[Math.floor(Math.random() * studentDatabase.length)];
      setStudent(randomStudent);
    }, 3000);
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanComplete(false);
    setStudent(null);
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
              <h3 className="text-2xl font-bold">AsistoYA - Reconocimiento Facial</h3>
              <p className="text-blue-100">Sistema de detección automática simplificado</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">1</div>
              <div className="text-xs text-blue-200">Estudiante</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{scanComplete ? '100%' : '0%'}</div>
              <div className="text-xs text-blue-200">Precisión</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Scanner Area */}
        <div className="relative mb-8">
          <div className="relative mx-auto w-96 h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Imagen de estudiante */}
            <div className="absolute inset-0">
              <img
                src="/mARIA.jpeg"
                alt="Estudiante"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay de escaneo */}
              <div className="absolute inset-0 bg-black bg-opacity-30" />
              
              {/* Marco de detección */}
              <div className="absolute inset-8 border-2 border-blue-400 rounded-lg">
                {/* Esquinas del marco */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-l-4 border-t-4 border-blue-400" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-r-4 border-t-4 border-blue-400" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-4 border-b-4 border-blue-400" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-4 border-b-4 border-blue-400" />
              </div>
            </div>

            {/* Efecto de escaneo */}
            <AnimatePresence>
              {isScanning && (
                <>
                  {/* Línea de escaneo */}
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ 
                      y: 410,
                      opacity: [0, 1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 3,
                      ease: "easeInOut",
                      repeat: 0
                    }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg"
                    style={{
                      boxShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 0 60px #22d3ee'
                    }}
                  />
                  
                  {/* Efectos de partículas */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: 0 }}
                    className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-blue-400/10"
                  />

                  {/* Grid de escaneo */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 3, repeat: 0 }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Estado de éxito */}
            <AnimatePresence>
              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="bg-green-500 rounded-full p-4"
                  >
                    <CheckCircle className="h-12 w-12 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicador de estado */}
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-3 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      isScanning ? 'bg-cyan-400 animate-pulse' : 
                      scanComplete ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium">
                      {isScanning ? 'Escaneando rostro...' : 
                       scanComplete ? 'Estudiante identificada' : 'Sistema listo'}
                    </span>
                  </div>
                  {isScanning && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Scan className="h-4 w-4 text-cyan-400" />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-center space-x-4 mb-8">
          {!isScanning && !scanComplete && (
            <motion.button
              onClick={startScan}
              className="flex items-center px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Scan className="mr-3 h-6 w-6" />
              Iniciar Escaneo
            </motion.button>
          )}

          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center px-8 py-4 rounded-xl font-semibold text-lg bg-cyan-600 text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <Scan className="h-6 w-6" />
              </motion.div>
              Analizando rostro...
            </motion.div>
          )}

          {scanComplete && (
            <motion.button
              onClick={resetScan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center px-6 py-4 rounded-xl font-semibold text-lg bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Escanear de Nuevo
            </motion.button>
          )}
        </div>

        {/* Resultado del escaneo */}
        <AnimatePresence>
          {scanComplete && student && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header del resultado */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="bg-white bg-opacity-20 rounded-full p-3 mr-4"
                  >
                    <CheckCircle className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <h4 className="text-2xl font-bold">¡Estudiante Reconocida!</h4>
                    <p className="text-green-100">Asistencia registrada exitosamente</p>
                  </div>
                </div>
              </div>

              {/* Información del estudiante */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Nombre Completo</p>
                        <p className="font-semibold text-gray-900 text-lg">{student.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Código de Estudiante</p>
                        <p className="font-mono font-semibold text-purple-700">{student.code}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <School className="h-5 w-5 text-indigo-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Grado</p>
                        <p className="font-semibold text-gray-900">{student.grade}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Hora de Llegada</p>
                        <p className="font-semibold text-green-700">{student.arrivalTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estados adicionales */}
                <div className="mt-6 flex space-x-4">
                  <div className="flex-1 bg-green-50 rounded-lg p-4 text-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-green-800">Asistencia Confirmada</p>
                    <p className="text-xs text-green-600">Notificación enviada a padres</p>
                  </div>
                  
                  <div className="flex-1 bg-blue-50 rounded-lg p-4 text-center">
                    <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-blue-800">Reconocimiento Exitoso</p>
                    <p className="text-xs text-blue-600">Precisión: 98.5%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Información del sistema */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 rounded-full p-2 mr-3">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
            <h5 className="font-semibold text-indigo-900">Sistema Simplificado de Reconocimiento</h5>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-2">Características</h6>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Escaneo facial instantáneo</li>
                <li>• Reconocimiento automático</li>
                <li>• Interfaz intuitiva</li>
                <li>• Efectos visuales modernos</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-2">Beneficios</h6>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Registro rápido de asistencia</li>
                <li>• Experiencia simplificada</li>
                <li>• Notificaciones automáticas</li>
                <li>• Precisión garantizada</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-2">Tecnología</h6>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• IA de reconocimiento facial</li>
                <li>• Procesamiento en tiempo real</li>
                <li>• Seguridad avanzada</li>
                <li>• Integración completa</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognitionDemo;
