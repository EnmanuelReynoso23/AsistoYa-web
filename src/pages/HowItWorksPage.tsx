import React from 'react';
import { Camera, Server, Bell, Award, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Captura de Imagen',
    description: 'Nuestras cámaras capturan imágenes de los estudiantes al ingresar a la escuela sin interrumpir su flujo normal.',
    icon: <Camera className="h-12 w-12 text-blue-500" />,
    image: 'https://images.pexels.com/photos/3400353/pexels-photo-3400353.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    title: 'Procesamiento con IA',
    description: 'Nuestro algoritmo de reconocimiento facial basado en OpenCV y YOLO v8 identifica a cada estudiante comparándolo con su información registrada.',
    icon: <Server className="h-12 w-12 text-blue-500" />,
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    title: 'Notificación a Padres',
    description: 'Los padres reciben notificaciones instantáneas a través de la app y SMS cuando sus hijos llegan o salen de la escuela.',
    icon: <Bell className="h-12 w-12 text-blue-500" />,
    image: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    title: 'Gamificación y Reportes',
    description: 'El sistema recompensa la asistencia constante y genera reportes detallados para ayudar a mejorar las tasas de asistencia.',
    icon: <Award className="h-12 w-12 text-blue-500" />,
    image: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const HowItWorksPage = () => {
  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Cómo Funciona AsistoYA
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Descubre el proceso completo desde la captura de imagen hasta la notificación a padres, todo en segundos.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 md:gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    {step.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-gray-50 text-gray-500 text-sm">Paso {step.id} de 4</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-blue-600 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">¿Listo para implementar</span>
                <span className="block">AsistoYA en tu escuela?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-blue-100">
                Solicita una demostración personalizada para tu institución y descubre todos los beneficios que ofrecemos.
              </p>
              <a
                href="/#contact"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                Solicitar Demostración <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;