import React from 'react';
import { BellRing, Clock, Shield, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import ParentAppDemo from '../components/ParentAppDemo';

const benefits = [
  {
    title: 'Notificaciones en Tiempo Real',
    description: 'Reciba alertas inmediatas cuando su hijo llegue a la escuela o cuando salga, brindándole tranquilidad durante todo el día.',
    icon: <BellRing className="h-8 w-8 text-blue-500" />
  },
  {
    title: 'Control de Horario',
    description: 'Verifique las horas exactas de entrada y salida, permitiéndole coordinar mejor las actividades familiares y detectar irregularidades.',
    icon: <Clock className="h-8 w-8 text-blue-500" />
  },
  {
    title: 'Privacidad Garantizada',
    description: 'Toda la información está protegida con encriptación de extremo a extremo y solo los padres autorizados pueden acceder a los datos de sus hijos.',
    icon: <Shield className="h-8 w-8 text-blue-500" />
  },
  {
    title: 'Alertas de Ausencia',
    description: 'Reciba notificaciones inmediatas si su hijo no llega a la escuela en el horario esperado, permitiendo una respuesta rápida.',
    icon: <AlertTriangle className="h-8 w-8 text-blue-500" />
  },
  {
    title: 'Historial de Asistencia',
    description: 'Acceda al registro completo de asistencia de su hijo, incluyendo días presentes, ausencias y llegadas tardías en un formato fácil de entender.',
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />
  },
  {
    title: 'App Móvil Intuitiva',
    description: 'Nuestra aplicación es fácil de usar y funciona en cualquier smartphone, con notificaciones SMS adicionales para garantizar que nunca pierda una alerta importante.',
    icon: <Smartphone className="h-8 w-8 text-blue-500" />
  }
];

const ForParentsPage = () => {
  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            AsistoYA para Padres
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Manténgase informado sobre sus hijos y disfrute de la tranquilidad de saber que llegaron seguros a la escuela.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Una Nueva Forma de Conectar con la Educación de sus Hijos</h2>
            <p className="text-lg text-gray-600 mb-8">
              En la República Dominicana, muchos padres envían a sus hijos a escuelas ubicadas a kilómetros de sus hogares. La incertidumbre sobre su llegada segura genera estrés y preocupación. AsistoYA elimina esta ansiedad con notificaciones instantáneas.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">¿Sabía que?</h3>
              <p className="text-gray-600">
                El 83% de los padres experimenta ansiedad mientras sus hijos están en la escuela, especialmente cuando no pueden confirmar su llegada segura. AsistoYA reduce esta ansiedad en un 92%.
              </p>
            </div>
            <div className="flex justify-center md:justify-start">
              <a
                href="/#contact"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
              >
                Solicitar Acceso
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <ParentAppDemo />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-20">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Beneficios para Padres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-12 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Testimonios de Padres
                </h2>
                <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-4">
                  <p className="text-blue-100 italic mb-4">
                    "AsistoYA me da tranquilidad todos los días. Recibo una notificación cuando mi hija llega a la escuela y otra cuando sale. Es como estar allí con ella."
                  </p>
                  <p className="text-white font-medium">
                    - Ana Díaz, madre de estudiante de primaria
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                  <p className="text-blue-100 italic mb-4">
                    "Mis dos hijos asisten a escuelas diferentes y antes era imposible estar pendiente de ambos. Con AsistoYA, puedo seguir su asistencia desde mi teléfono sin preocupaciones."
                  </p>
                  <p className="text-white font-medium">
                    - Miguel Hernández, padre de dos estudiantes
                  </p>
                </div>
              </div>
              <div className="lg:pl-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Únase a miles de padres que ya disfrutan de la tranquilidad con AsistoYA
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="parent-name" className="sr-only">Nombre</label>
                    <input
                      id="parent-name"
                      name="name"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
                      placeholder="Su nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="parent-email" className="sr-only">Email</label>
                    <input
                      id="parent-email"
                      name="email"
                      type="email"
                      required
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
                      placeholder="Su correo electrónico"
                    />
                  </div>
                  <div>
                    <label htmlFor="school-name" className="sr-only">Escuela</label>
                    <input
                      id="school-name"
                      name="school"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
                      placeholder="Nombre de la escuela de su hijo/a"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Solicitar Información
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForParentsPage;