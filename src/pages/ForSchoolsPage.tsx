import React from 'react';
import { Clock, Users, BarChart as ChartBar, Zap, DollarSign, Shield, CheckCircle, TrendingUp } from 'lucide-react';

const benefits = [
  {
    title: 'Ahorro de Tiempo Significativo',
    description: 'Elimine el pase de lista manual. Los docentes ahorran hasta 15 minutos por día, equivalente a más de 45 horas lectivas al año que pueden dedicar a la enseñanza.',
    icon: <Clock className="h-8 w-8 text-blue-500" />,
    stats: '45+ horas/año'
  },
  {
    title: 'Precisión Garantizada',
    description: 'Sistema de reconocimiento facial con 99.9% de precisión. Elimine errores humanos y mantenga un registro exacto y auditable de la asistencia de cada estudiante.',
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
    stats: '99.9% precisión'
  },
  {
    title: 'Análisis Predictivo',
    description: 'Identifique patrones de ausentismo antes de que se conviertan en problemas. Nuestro sistema de IA detecta tendencias y envía alertas tempranas.',
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    stats: '-40% ausentismo'
  },
  {
    title: 'Automatización Inteligente',
    description: 'Reduzca la carga administrativa con un sistema que funciona 24/7. Genere reportes automáticos y envíe notificaciones sin intervención humana.',
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    stats: '100% automático'
  },
  {
    title: 'ROI Comprobado',
    description: 'Reduzca costos operativos hasta en un 30%. Mejore la satisfacción de padres y estudiantes, aumentando la retención y atrayendo nuevos alumnos.',
    icon: <DollarSign className="h-8 w-8 text-blue-500" />,
    stats: '30% ahorro'
  },
  {
    title: 'Seguridad Avanzada',
    description: 'Control de acceso biométrico que garantiza que solo personas autorizadas ingresen al campus. Registro en tiempo real de presencia para emergencias.',
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    stats: '100% seguro'
  }
];

const ForSchoolsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            AsistoYA para Escuelas
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforme la gestión de asistencia en su institución con tecnología de vanguardia que ahorra tiempo y recursos.
          </p>
        </div>

        {/* Dashboard Preview Section - Redesigned */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  Panel de Control Avanzado
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nuestro dashboard administrativo proporciona visualizaciones claras y reportes detallados que permiten a directores y docentes monitorear la asistencia en tiempo real.
                </p>
                
                <div className="space-y-6 mb-8">
                  {[
                    'Estadísticas de asistencia diaria, semanal y mensual',
                    'Alertas automáticas para ausentismo recurrente',
                    'Exportación de reportes en múltiples formatos',
                    'Integración con sistemas de gestión escolar existentes'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
                
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
                  Solicitar Demostración
                </button>
              </div>

              {/* Right - Dashboard Preview */}
              <div className="relative">
                {/* Browser Frame */}
                <div className="bg-gray-800 rounded-t-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-700 rounded ml-4 px-3 py-1">
                      <span className="text-gray-300 text-xs">dashboard.asistoya.com</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold">Panel de Control MINERD</h3>
                      <p className="text-blue-100 text-sm">Sistema Nacional de Asistencia Escolar</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm mb-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                        En vivo
                      </div>
                      <div className="text-sm font-mono">09:45:23</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">2.0M</div>
                      <div className="text-xs text-blue-200">Estudiantes</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">7.5K</div>
                      <div className="text-xs text-blue-200">Escuelas</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">15K</div>
                      <div className="text-xs text-blue-200">Docentes</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-xs text-blue-200">Asistencia</div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="bg-white p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Activity Feed */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                        Actividad en Tiempo Real
                      </h4>
                      <div className="space-y-3">
                        {[
                          { time: '07:45', event: 'María Rodríguez llegó', school: 'Liceo Matutino', type: 'arrival' },
                          { time: '07:50', event: 'Juan Pérez llegó', school: 'Escuela Central', type: 'arrival' },
                          { time: '08:15', event: 'Ana García - Ausencia', school: 'Colegio San José', type: 'absence' }
                        ].map((activity, index) => (
                          <div key={index} className={`border rounded-lg p-3 ${
                            activity.type === 'arrival' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{activity.event}</div>
                                <div className="text-xs text-gray-500">{activity.school}</div>
                              </div>
                              <div className="text-xs text-gray-500">{activity.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attendance by Level */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Asistencia por Nivel</h4>
                      <div className="space-y-4">
                        {[
                          { level: 'Primer Ciclo', percentage: 96, color: 'bg-blue-500' },
                          { level: 'Segundo Ciclo', percentage: 94, color: 'bg-green-500' },
                          { level: 'Bachillerato', percentage: 92, color: 'bg-purple-500' },
                          { level: 'Técnico', percentage: 95, color: 'bg-orange-500' }
                        ].map((level, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-700">{level.level}</span>
                              <span className="text-sm font-semibold text-gray-900">{level.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${level.color}`}
                                style={{ width: `${level.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Schools */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Escuelas con Mejor Rendimiento</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { name: 'Liceo José Martí', percentage: 98.5, location: 'Santo Domingo' },
                        { name: 'Colegio San Rafael', percentage: 97.8, location: 'Santiago' },
                        { name: 'Instituto Central', percentage: 97.2, location: 'La Vega' },
                        { name: 'Escuela Duarte', percentage: 96.9, location: 'San Pedro' }
                      ].map((school, index) => (
                        <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600">{school.percentage}%</div>
                          <div className="text-xs font-medium text-gray-900">{school.name}</div>
                          <div className="text-xs text-gray-500">{school.location}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficios para su Institución</h2>
            <p className="text-xl text-gray-600">
              Descubra cómo AsistoYA transforma la gestión escolar con beneficios tangibles y medibles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    {benefit.icon}
                  </div>
                  <span className="text-lg font-bold text-blue-600">{benefit.stats}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">¿Listo para transformar</span>
                <span className="block">la asistencia en su escuela?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-blue-100">
                Solicite una demostración personalizada y descubra cómo AsistoYA puede beneficiar a su institución.
              </p>
              <a
                href="/#contact"
                className="mt-8 bg-white border border-transparent rounded-lg shadow px-8 py-4 inline-flex items-center text-lg font-medium text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
              >
                Solicitar Demostración
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForSchoolsPage;