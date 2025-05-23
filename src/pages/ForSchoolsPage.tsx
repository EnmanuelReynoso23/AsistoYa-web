import React from 'react';
import { Clock, Users, BarChart as ChartBar, Zap, DollarSign, Shield, CheckCircle, TrendingUp } from 'lucide-react';
import AdminDashboard from '../components/AdminDashboard';

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

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">Panel de Control Avanzado</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro dashboard administrativo proporciona visualizaciones claras y reportes detallados que permiten a directores y docentes monitorear la asistencia en tiempo real.
              </p>
              <ul className="space-y-6 mb-8">
                {[
                  'Estadísticas de asistencia diaria, semanal y mensual',
                  'Alertas automáticas para ausentismo recurrente',
                  'Exportación de reportes en múltiples formatos',
                  'Integración con sistemas de gestión escolar existentes'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">{feature}</p>
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
                Solicitar Demostración
              </button>
            </div>
            <div className="bg-gray-50 p-4 lg:p-6">
              <div className="h-full overflow-hidden rounded-lg shadow-inner bg-white">
                <div className="transform scale-90 origin-top-left">
                  <AdminDashboard />
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