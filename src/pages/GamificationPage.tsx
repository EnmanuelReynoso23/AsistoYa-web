import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GamificationPanel from '../components/GamificationPanel';
import GamificationWidget from '../components/GamificationWidget';
import { Trophy, Star, Users, Target, Gamepad2, Award, TrendingUp } from 'lucide-react';

const GamificationPage = () => {
  const [showWidget, setShowWidget] = useState(true);

  const features = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: 'Sistema de Niveles',
      description: 'Progresa a través de niveles ganando experiencia por tu asistencia y puntualidad.'
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: 'Logros y Medallas',
      description: 'Desbloquea logros especiales por completar desafíos y mantener buena asistencia.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Clasificaciones',
      description: 'Compite sanamente con tus compañeros en las tablas de clasificación semanales.'
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: 'Objetivos Personalizados',
      description: 'Establece y alcanza objetivos personales de asistencia y puntualidad.'
    },
    {
      icon: <Star className="h-8 w-8 text-orange-500" />,
      title: 'Recompensas Virtuales',
      description: 'Canjea tus puntos por insignias, avatares y privilegios especiales.'
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-indigo-500" />,
      title: 'Desafíos Semanales',
      description: 'Participa en desafíos especiales para ganar puntos extra y recompensas únicas.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Sistema de Gamificación
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Convierte la asistencia escolar en una experiencia divertida y motivadora con nuestro sistema de logros, niveles y recompensas.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowWidget(!showWidget)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {showWidget ? 'Ocultar Widget' : 'Mostrar Widget'}
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gray-50 rounded-full p-4 w-fit mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Widget Demo */}
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Widget de Gamificación
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Versión Compacta</h3>
                <GamificationWidget compact={true} />
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Versión Completa</h3>
                <GamificationWidget compact={false} showDetails={true} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Gamification Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Panel de Gamificación Completo
          </h2>
          <GamificationPanel />
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Beneficios de la Gamificación
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mejora la Asistencia</h3>
              <p className="text-gray-600">Incrementa la motivación de los estudiantes para asistir regularmente.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fomenta la Competencia Sana</h3>
              <p className="text-gray-600">Crea un ambiente de competencia positiva entre estudiantes.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Establece Objetivos Claros</h3>
              <p className="text-gray-600">Ayuda a los estudiantes a establecer y alcanzar metas específicas.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reconoce el Esfuerzo</h3>
              <p className="text-gray-600">Proporciona reconocimiento inmediato por el buen comportamiento.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamificationPage;