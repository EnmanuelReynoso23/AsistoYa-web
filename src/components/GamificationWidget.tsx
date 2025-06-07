import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, TrendingUp, ChevronRight, Zap } from 'lucide-react';

interface GamificationWidgetProps {
  compact?: boolean;
  showDetails?: boolean;
  onOpenPanel?: () => void;
}

const GamificationWidget: React.FC<GamificationWidgetProps> = ({ 
  compact = false, 
  showDetails = true,
  onOpenPanel 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mock user data
  const userData = {
    level: 12,
    experience: 2850,
    experienceToNext: 3200,
    totalPoints: 15420,
    streak: 15,
    recentAchievements: [
      { name: 'Pro de la Puntualidad', icon: '⏰', rarity: 'epic' },
      { name: 'Semana Perfecta', icon: '📅', rarity: 'common' }
    ]
  };

  const getProgressPercentage = () => {
    return (userData.experience / userData.experienceToNext) * 100;
  };

  if (compact) {
    return (
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-3 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpenPanel}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-bold">Nivel {userData.level}</div>
              <div className="text-xs opacity-90">{userData.totalPoints.toLocaleString()} pts</div>
            </div>
          </div>
          <div className="flex items-center">
            <Flame className="h-4 w-4 text-orange-300 mr-1" />
            <span className="text-sm font-bold">{userData.streak}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold">Tu Progreso</h3>
              <p className="text-sm text-blue-100">Nivel {userData.level}</p>
            </div>
          </div>
          <motion.button
            onClick={onOpenPanel}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Experience Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progreso al Nivel {userData.level + 1}</span>
            <span>{userData.experience} / {userData.experienceToNext} XP</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 mx-auto mb-2 w-fit">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-600">{userData.totalPoints.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Puntos</div>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-3 mx-auto mb-2 w-fit">
              <Flame className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-orange-600">{userData.streak}</div>
            <div className="text-xs text-gray-600">Días</div>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 mx-auto mb-2 w-fit">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-600">#23</div>
            <div className="text-xs text-gray-600">Ranking</div>
          </div>
        </div>

        {/* Recent Achievements */}
        {showDetails && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-500" />
              Logros Recientes
            </h4>
            <div className="space-y-2">
              {userData.recentAchievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center p-2 rounded-lg ${
                    achievement.rarity === 'epic' ? 'bg-purple-50 border border-purple-200' :
                    achievement.rarity === 'rare' ? 'bg-blue-50 border border-blue-200' :
                    'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg mr-3">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{achievement.name}</div>
                    <div className={`text-xs ${
                      achievement.rarity === 'epic' ? 'text-purple-600' :
                      achievement.rarity === 'rare' ? 'text-blue-600' :
                      'text-gray-600'
                    }`}>
                      {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          onClick={onOpenPanel}
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-all hover:from-purple-700 hover:to-blue-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ver Todos los Logros
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GamificationWidget;