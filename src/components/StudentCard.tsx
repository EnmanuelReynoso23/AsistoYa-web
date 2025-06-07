import React from 'react';
import { CheckCircle, Clock, Trophy, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentCardProps {
  name: string;
  arrivalTime: Date;
  confidence: number;
  studentCode?: string;
  level?: number;
  points?: number;
  streak?: number;
  showGamification?: boolean;
}

const StudentCard: React.FC<StudentCardProps> = ({ 
  name, 
  arrivalTime, 
  confidence,
  studentCode,
  level = 5,
  points = 1250,
  streak = 7,
  showGamification = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        {/* Avatar with Level */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          {showGamification && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {level}
            </div>
          )}
        </div>
        
        {/* Student Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
              {studentCode && (
                <p className="text-xs text-blue-600 font-mono mb-1">
                  Código: {studentCode}
                </p>
              )}
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  Llegó a las {arrivalTime.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Confianza: {Math.round(confidence * 100)}%
              </p>
            </div>
            
            {/* Status */}
            <div className="text-center">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-1" />
              <span className="text-xs text-green-600 font-medium">PRESENTE</span>
            </div>
          </div>

          {/* Gamification Elements */}
          {showGamification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-2 mx-auto mb-1 w-fit">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-sm font-bold text-purple-600">{points}</div>
                  <div className="text-xs text-gray-500">Puntos</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full p-2 mx-auto mb-1 w-fit">
                    <Flame className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="text-sm font-bold text-orange-600">{streak}</div>
                  <div className="text-xs text-gray-500">Racha</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full p-2 mx-auto mb-1 w-fit">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="text-sm font-bold text-yellow-600">#{Math.floor(Math.random() * 50) + 1}</div>
                  <div className="text-xs text-gray-500">Ranking</div>
                </div>
              </div>

              {/* Achievement Notification */}
              {Math.random() > 0.7 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-2"
                >
                  <div className="flex items-center text-xs">
                    <Trophy className="h-3 w-3 text-yellow-600 mr-1" />
                    <span className="text-yellow-800 font-medium">¡Nuevo logro desbloqueado!</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">"Puntualidad Perfecta" - +100 XP</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentCard;