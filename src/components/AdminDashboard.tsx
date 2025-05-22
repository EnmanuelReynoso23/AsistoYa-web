import React, { useState } from 'react';
import { BarChart, Users, Clock, AlertTriangle, ArrowUp, ArrowDown, School, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState('today');

  const stats = {
    totalStudents: 2000000, // Más de 2 millones de estudiantes en el sistema público
    presentToday: 1940000,
    absentToday: 60000,
    lateToday: 40000,
    attendanceRate: 95,
    changeFromLastWeek: 3.5,
    totalSchools: 7500,
    activeTeachers: 15000
  };

  const recentActivity = [
    { time: '7:45 AM', event: 'María Rodríguez llegó a la escuela', type: 'arrival' },
    { time: '7:50 AM', event: 'Juan Pérez llegó a la escuela', type: 'arrival' },
    { time: '8:15 AM', event: 'Ana García - Ausencia reportada', type: 'absence' },
    { time: '8:30 AM', event: 'Carlos Méndez llegó tarde', type: 'late' },
    { time: '8:35 AM', event: 'Nueva escuela registrada: Liceo Manuel del Cabral', type: 'school' },
    { time: '8:40 AM', event: 'Profesor registrado: Prof. Santiago Mejía', type: 'teacher' }
  ];

  const attendanceByGrade = [
    { grade: 'Primer Ciclo Básico', attendance: 96 },
    { grade: 'Segundo Ciclo Básico', attendance: 94 },
    { grade: 'Primer Ciclo Medio', attendance: 92 },
    { grade: 'Segundo Ciclo Medio', attendance: 90 },
    { grade: 'Modalidad Técnica', attendance: 95 }
  ];

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 py-4 overflow-x-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Panel de Control MINERD</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setTimeframe('today')}
              className={`px-4 py-2 rounded-md ${
                timeframe === 'today'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded-md ${
                timeframe === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Esta Semana
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-md ${
                timeframe === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Este Mes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Estudiantes</span>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {(stats.totalStudents / 1000000).toFixed(1)}M
            </p>
            <p className="ml-2 text-sm text-gray-500">estudiantes</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <School className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Escuelas Activas</span>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.totalSchools}</p>
            <p className="ml-2 text-sm text-gray-500">centros</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <UserPlus className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Docentes Activos</span>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.activeTeachers}</p>
            <p className="ml-2 text-sm text-gray-500">profesores</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Tasa de Asistencia</span>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.attendanceRate}%</p>
            <div className="ml-2 flex items-center text-sm">
              {stats.changeFromLastWeek > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={stats.changeFromLastWeek > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(stats.changeFromLastWeek)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className={`flex-shrink-0 h-3 w-3 rounded-full mt-2 mr-3 ${
                  activity.type === 'arrival' ? 'bg-green-500' :
                  activity.type === 'absence' ? 'bg-red-500' :
                  activity.type === 'late' ? 'bg-yellow-500' :
                  activity.type === 'school' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asistencia por Nivel</h3>
          <div className="space-y-4">
            {attendanceByGrade.map((grade, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{grade.grade}</span>
                  <span className="text-sm font-medium text-gray-900">{grade.attendance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${grade.attendance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;