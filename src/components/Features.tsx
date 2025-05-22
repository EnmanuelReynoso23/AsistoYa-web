import React from 'react';
import { Clock, BellRing, LineChart, Award, Zap, Shield } from 'lucide-react';

const features = [
  {
    name: 'Reconocimiento Facial',
    description:
      'Tecnología avanzada que detecta y reconoce a los estudiantes automáticamente sin necesidad de contacto físico.',
    icon: <Zap className="h-6 w-6 text-blue-500" />,
  },
  {
    name: 'Notificaciones en Tiempo Real',
    description:
      'Los padres reciben alertas inmediatas cuando sus hijos llegan a la escuela o si están ausentes.',
    icon: <BellRing className="h-6 w-6 text-blue-500" />,
  },
  {
    name: 'Reportes Detallados',
    description:
      'Visualización de datos de asistencia, tendencias y patrones para directores y docentes.',
    icon: <LineChart className="h-6 w-6 text-blue-500" />,
  },
  {
    name: 'Ahorro de Tiempo',
    description:
      'Elimina el proceso manual de toma de asistencia permitiendo a los docentes enfocarse en la enseñanza.',
    icon: <Clock className="h-6 w-6 text-blue-500" />,
  },
  {
    name: 'Gamificación',
    description:
      'Sistema de recompensas que motiva a los estudiantes a mantener una asistencia regular.',
    icon: <Award className="h-6 w-6 text-blue-500" />,
  },
  {
    name: 'Seguridad Garantizada',
    description:
      'Protección de datos de los estudiantes con encriptación de extremo a extremo y cumplimiento normativo.',
    icon: <Shield className="h-6 w-6 text-blue-500" />,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white section" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Transformando la asistencia escolar
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            AsistoYA revoluciona la forma en que las escuelas gestionan la asistencia, brindando tranquilidad a los padres y eficiencia al personal.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 text-white">
                  {feature.icon}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;