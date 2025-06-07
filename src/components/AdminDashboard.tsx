import React, { useState, useEffect } from 'react';
import { BarChart, Users, Clock, AlertTriangle, ArrowUp, ArrowDown, School, UserPlus, TrendingUp, Activity, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState('today');
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = {
    totalStudents: 2000000,
    presentToday: 1940000,
    absentToday: 60000,
    lateToday: 40000,
    attendanceRate: 95,
    changeFromLastWeek: 3.5,
    totalSchools: 7500,
    activeTeachers: 15000
  };

  const recentActivity = [
    { time: '7:45 AM', event: 'María Rodríguez llegó a la escuela', type: 'arrival', school: 'Liceo Matutino' },
    { time: '7:50 AM', event: 'Juan Pérez llegó a la escuela', type: 'arrival', school: 'Escuela Primaria Central' },
    { time: '8:15 AM', event: 'Ana García - Ausencia reportada', type: 'absence', school: 'Colegio San José' },
    { time: '8:30 AM', event: 'Carlos Méndez llegó tarde', type: 'late', school: 'Instituto Técnico' },
    { time: '8:35 AM', event: 'Nueva escuela registrada: Liceo Manuel del Cabral', type: 'school', school: 'Sistema' },
    { time: '8:40 AM', event: 'Profesor registrado: Prof. Santiago Mejía', type: 'teacher', school: 'Escuela Rural Norte' }
  ];

  const attendanceByGrade = [
    { grade: 'Primer Ciclo Básico', attendance: 96, students: 450000, trend: 'up' },
    { grade: 'Segundo Ciclo Básico', attendance: 94, students: 520000, trend: 'up' },
    { grade: 'Primer Ciclo Medio', attendance: 92, students: 380000, trend: 'down' },
    { grade: 'Segundo Ciclo Medio', attendance: 90, students: 320000, trend: 'down' },
    { grade: 'Modalidad Técnica', attendance: 95, students: 330000, trend: 'up' }
  ];

  const topPerformingSchools = [
    { name: 'Liceo José Martí', attendance: 98.5, location: 'Santo Domingo', students: 1200 },
    { name: 'Colegio San Rafael', attendance: 97.8, location: 'Santiago', students: 980 },
    { name: 'Instituto Técnico Central', attendance: 97.2, location: 'La Vega', students: 1500 },
    { name: 'Escuela Primaria Duarte', attendance: 96.9, location: 'San Pedro', students: 800 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'arrival': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'absence': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'school': return <School className="h-4 w-4 text-blue-500" />;
      case 'teacher': return <UserPlus className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case 'arrival': return 'bg-green-50 border-green-200';
      case 'absence': return 'bg-red-50 border-red-200';
      case 'late': return 'bg-yellow-50 border-yellow-200';
      case 'school': return 'bg-blue-50 border-blue-200';
      case 'teacher': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold">Panel de Control MINERD</h2>
            <p className="text-blue-100">Sistema Nacional de Asistencia Escolar</p>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-2">
              <div className={`w-3 h-3 rounded-full mr-2 ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-sm">{isLive ? 'En vivo' : 'Desconectado'}</span>
            </div>
            <div className="text-lg font-mono">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Time Frame Selector */}
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeframe === period
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'bg-indigo-500 text-white hover:bg-indigo-400'
              }`}
            >
              {period === 'today' ? 'Hoy' : period === 'week' ? 'Esta Semana' : 'Este Mes'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">Total Estudiantes</div>
                <div className="text-3xl font-bold text-gray-900">
                  {(stats.totalStudents / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>+2.3% vs mes anterior</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <School className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">Escuelas Activas</div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalSchools.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span>+45 nuevas este mes</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <UserPlus className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">Docentes Activos</div>
                <div className="text-3xl font-bold text-gray-900">{stats.activeTeachers.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>+1.8% capacitados</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <BarChart className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">Tasa de Asistencia</div>
                <div className="text-3xl font-bold text-gray-900">{stats.attendanceRate}%</div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-600 font-medium">+{stats.changeFromLastWeek}%</span>
              <span className="text-gray-600 ml-1">vs semana anterior</span>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Actividad en Tiempo Real</h3>
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                Actualizando...
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${getActivityBg(activity.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.school}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Attendance by Grade */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Asistencia por Nivel</h3>
            <div className="space-y-4">
              {attendanceByGrade.map((grade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{grade.grade}</span>
                      <div className="text-xs text-gray-500">
                        {(grade.students / 1000).toFixed(0)}k estudiantes
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {grade.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm font-bold text-gray-900">{grade.attendance}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${grade.attendance}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Performing Schools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Escuelas con Mejor Rendimiento</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Últimos 30 días
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPerformingSchools.map((school, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <School className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{school.attendance}%</div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{school.name}</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {school.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {school.students} estudiantes
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;