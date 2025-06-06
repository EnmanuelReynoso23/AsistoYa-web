import { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock } from 'lucide-react';
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
  
  // Escuchar notificaciones en tiempo real del sistema de reconocimiento facial
  useEffect(() => {
    const handleNewNotifications = (event: CustomEvent) => {
      const newNotifications = event.detail;
      console.log('Nuevas notificaciones recibidas:', newNotifications);
      
      setNotifications(prev => {
        // Agregar las nuevas notificaciones al principio de la lista
        const updated = [...newNotifications, ...prev];
        
        // Mostrar una notificación visual
        if (newNotifications.length > 0) {
          const studentNames = newNotifications.map((n: any) => n.studentName).join(', ');
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('AsistoYA - Nueva Asistencia', {
              body: `${studentNames} ha(n) llegado a la escuela`,
              icon: '/favicon.ico'
            });
          }
        }
        
        return updated;
      });
    };

    // Solicitar permisos de notificación
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
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg my-8">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-full p-2 mr-2">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">App para Padres</h3>
                <p className="text-gray-600 text-sm">Manténgase informado sobre sus hijos</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Demo</div>
          </div>

          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
              >
                Notificaciones
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`${
                  activeTab === 'attendance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
              >
                Asistencia
              </button>
            </nav>
          </div>

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg border ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-3 flex-shrink-0 ${
                      notification.type === 'arrival' ? 'bg-green-100' : 
                      notification.type === 'departure' ? 'bg-blue-100' : 
                      'bg-red-100'
                    }`}>
                      {notification.type === 'arrival' && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {notification.type === 'departure' && <Clock className="h-5 w-5 text-blue-600" />}
                      {notification.type === 'absence' && <XCircle className="h-5 w-5 text-red-600" />}
                    </div>                    <div>
                      <p className="font-medium text-gray-900">{notification.message}</p>
                      <div className="text-gray-500 text-sm">
                        <p>
                          {notification.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          {notification.timestamp.toDateString() !== new Date().toDateString() && 
                            ` - ${notification.timestamp.toLocaleDateString()}`
                          }
                        </p>
                        {/* Mostrar código del estudiante si está disponible */}
                        {(notification as any).studentCode && (
                          <p className="text-xs text-blue-600 font-mono">
                            Código: {(notification as any).studentCode}
                          </p>
                        )}
                        {/* Mostrar confianza si está disponible */}
                        {(notification as any).confidence && (
                          <p className="text-xs text-green-600">
                            Confianza: {Math.round((notification as any).confidence * 100)}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="mt-2 text-xs text-blue-600 text-right">
                      Toque para marcar como leído
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">María Rodríguez - 8vo Grado B</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Presente</p>
                    <p className="text-xl font-bold text-green-600">18</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Ausente</p>
                    <p className="text-xl font-bold text-red-600">2</p>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Tarde</p>
                    <p className="text-xl font-bold text-yellow-600">1</p>
                  </div>
                </div>
                <div className="flex items-center mb-1">
                  <div className="mr-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
                  </div>
                  <div className="text-sm">
                    Asistencia actual: <span className="font-medium">90%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Juan Pérez - 6to Grado A</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Presente</p>
                    <p className="text-xl font-bold text-green-600">15</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Ausente</p>
                    <p className="text-xl font-bold text-red-600">4</p>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Tarde</p>
                    <p className="text-xl font-bold text-yellow-600">3</p>
                  </div>
                </div>
                <div className="flex items-center mb-1">
                  <div className="mr-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
                  </div>
                  <div className="text-sm">
                    Asistencia actual: <span className="font-medium">75%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentAppDemo;