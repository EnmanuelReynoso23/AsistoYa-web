import { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock, Users, TrendingUp, Award, Smartphone, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notification } from '../types';

const mockNotifications: Notification[] = [
  {
    id: '1',
    studentId: '101',
    studentName: 'María Rodríguez',
    type: 'arrival',
    message: 'María llegó a la escuela',
    timestamp: new Date(new Date().setHours(7, 45)),
    read: true
  },
  {
    id: '2',
    studentId: '101',
    studentName: 'María Rodríguez',
    type: 'departure',
    message: 'María salió de la escuela',
    timestamp: new Date(new Date().setHours(14, 30)),
    read: false
  },
  {
    id: '3',
    studentId: '102',
    studentName: 'Juan Pérez',
    type: 'absence',
    message: 'Juan no ha llegado a la escuela',
    timestamp: new Date(new Date().setHours(8, 30)),
    read: false
  }
];

const ParentAppDemo = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('notifications');
  const [isConnected, setIsConnected] = useState(true);
  const [newNotificationCount, setNewNotificationCount] = useState(2);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Listen for new notifications from face recognition system
  useEffect(() => {
    const handleNewNotifications = (event: CustomEvent) => {
      const newNotifications = event.detail;
      console.log('Nuevas notificaciones recibidas:', newNotifications);
      
      setNotifications(prev => {
        const updated = [...newNotifications, ...prev];
        setNewNotificationCount(prev => prev + newNotifications.length);
        
        // Show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          const studentNames = newNotifications.map((n: any) => n.studentName).join(', ');
          new Notification('AsistoYA - Nueva Asistencia', {
            body: `${studentNames} ha(n) llegado a la escuela`,
            icon: '/favicon.ico'
          });
        }
        
        return updated;
      });
    };

    // Request notification permissions
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    window.addEventListener('newAttendanceNotifications', handleNewNotifications as EventListener);
    
    return () => {
      window.removeEventListener('newAttendanceNotifications', handleNewNotifications as EventListener);
    };
  }, []);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
    if (newNotificationCount > 0) {
      setNewNotificationCount(prev => prev - 1);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'arrival': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'departure': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'absence': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'arrival': return 'bg-green-50 border-green-200';
      case 'departure': return 'bg-blue-50 border-blue-200';
      case 'absence': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Phone Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">App para Padres</h3>
              <p className="text-blue-100 text-sm">Mantente conectado con tus hijos</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: isConnected ? 1 : 0.8, opacity: isConnected ? 1 : 0.6 }}
              className={`p-1 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            >
              <Wifi className="h-4 w-4" />
            </motion.div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Demo
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">2</div>
            <div className="text-xs text-blue-200">Hijos</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">95%</div>
            <div className="text-xs text-blue-200">Asistencia</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">{newNotificationCount}</div>
            <div className="text-xs text-blue-200">Nuevas</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-all duration-200 ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
              {newNotificationCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  {newNotificationCount}
                </motion.span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-all duration-200 ${
              activeTab === 'attendance'
                ? 'border-blue-500 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Asistencia
            </div>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-4 h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay notificaciones</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      !notification.read 
                        ? `${getNotificationBg(notification.type)} shadow-sm` 
                        : 'bg-white border-gray-200'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`rounded-full p-2 flex-shrink-0 ${
                        notification.type === 'arrival' ? 'bg-green-100' : 
                        notification.type === 'departure' ? 'bg-blue-100' : 
                        'bg-red-100'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate">
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="text-gray-500 text-sm space-y-1">
                          <p>
                            {notification.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            {notification.timestamp.toDateString() !== new Date().toDateString() && 
                              ` - ${notification.timestamp.toLocaleDateString()}`
                            }
                          </p>
                          {(notification as any).studentCode && (
                            <p className="text-xs text-blue-600 font-mono">
                              Código: {(notification as any).studentCode}
                            </p>
                          )}
                          {(notification as any).confidence && (
                            <p className="text-xs text-green-600">
                              Confianza: {Math.round((notification as any).confidence * 100)}%
                            </p>
                          )}
                        </div>
                        {!notification.read && (
                          <p className="text-xs text-blue-600 mt-2">
                            Toque para marcar como leído
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'attendance' && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Student Cards */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-semibold">M</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">María Rodríguez</h4>
                        <p className="text-sm text-gray-600">8vo Grado B</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-xs text-green-600">Excelente</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-600">22</div>
                      <div className="text-xs text-gray-600">Presente</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-red-600">1</div>
                      <div className="text-xs text-gray-600">Ausente</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-yellow-600">0</div>
                      <div className="text-xs text-gray-600">Tarde</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Racha actual:</span>
                    <span className="font-semibold text-green-600 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      15 días
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-yellow-600 font-semibold">J</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Juan Pérez</h4>
                        <p className="text-sm text-gray-600">6to Grado A</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600">78%</div>
                      <div className="text-xs text-yellow-600">Mejorable</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-600">18</div>
                      <div className="text-xs text-gray-600">Presente</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-red-600">4</div>
                      <div className="text-xs text-gray-600">Ausente</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-yellow-600">1</div>
                      <div className="text-xs text-gray-600">Tarde</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-yellow-200 rounded-full h-2 mb-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Última asistencia:</span>
                    <span className="font-semibold text-gray-900">Ayer</span>
                  </div>
                </motion.div>
              </div>

              {/* Monthly Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4"
              >
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Resumen del Mes
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">86%</div>
                    <div className="text-sm text-blue-700">Promedio familiar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">40</div>
                    <div className="text-sm text-blue-700">Días de clase</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center"
        >
          <Users className="h-5 w-5 mr-2" />
          Ver Más Detalles
        </motion.button>
      </div>
    </div>
  );
};

export default ParentAppDemo;