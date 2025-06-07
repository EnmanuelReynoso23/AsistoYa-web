import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Award, Target, Zap, Crown, Medal, Gift, 
  TrendingUp, Users, Calendar, Flame, Sparkles, ChevronRight,
  Lock, Unlock, CheckCircle, Clock, BarChart3
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  streak: number;
  rank: number;
  totalUsers: number;
  attendanceRate: number;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'badge' | 'avatar' | 'theme' | 'privilege';
  icon: React.ReactNode;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const GamificationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'progress' | 'achievements' | 'leaderboard' | 'rewards'>('progress');
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Mock data - en producción vendría de la API
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    experience: 2850,
    experienceToNext: 3200,
    totalPoints: 15420,
    streak: 15,
    rank: 23,
    totalUsers: 1250,
    attendanceRate: 95
  });

  const achievements: Achievement[] = [
    {
      id: 'perfect_week',
      name: 'Semana Perfecta',
      description: 'Asiste todos los días de la semana',
      icon: <Calendar className="h-6 w-6" />,
      rarity: 'common',
      points: 100,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: 'early_bird',
      name: 'Madrugador',
      description: 'Llega temprano 10 días seguidos',
      icon: <Clock className="h-6 w-6" />,
      rarity: 'rare',
      points: 250,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 7)
    },
    {
      id: 'streak_master',
      name: 'Maestro de Rachas',
      description: 'Mantén una racha de 30 días',
      icon: <Flame className="h-6 w-6" />,
      rarity: 'epic',
      points: 500,
      unlocked: false,
      progress: 15,
      maxProgress: 30
    },
    {
      id: 'attendance_legend',
      name: 'Leyenda de Asistencia',
      description: 'Mantén 98% de asistencia por 6 meses',
      icon: <Crown className="h-6 w-6" />,
      rarity: 'legendary',
      points: 1000,
      unlocked: false,
      progress: 3,
      maxProgress: 6
    },
    {
      id: 'social_butterfly',
      name: 'Mariposa Social',
      description: 'Ayuda a 5 compañeros con su asistencia',
      icon: <Users className="h-6 w-6" />,
      rarity: 'rare',
      points: 300,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'punctuality_pro',
      name: 'Pro de la Puntualidad',
      description: 'Nunca llegues tarde en un mes',
      icon: <Target className="h-6 w-6" />,
      rarity: 'epic',
      points: 400,
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 14)
    }
  ];

  const rewards: Reward[] = [
    {
      id: 'golden_badge',
      name: 'Insignia Dorada',
      description: 'Muestra tu dedicación con esta insignia especial',
      cost: 500,
      type: 'badge',
      icon: <Medal className="h-6 w-6" />,
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 'premium_avatar',
      name: 'Avatar Premium',
      description: 'Desbloquea avatares exclusivos',
      cost: 750,
      type: 'avatar',
      icon: <Star className="h-6 w-6" />,
      unlocked: true,
      rarity: 'epic'
    },
    {
      id: 'dark_theme',
      name: 'Tema Oscuro',
      description: 'Personaliza tu interfaz con el tema oscuro',
      cost: 300,
      type: 'theme',
      icon: <Sparkles className="h-6 w-6" />,
      unlocked: false,
      rarity: 'common'
    },
    {
      id: 'early_dismissal',
      name: 'Salida Temprana',
      description: 'Privilegio de salir 10 minutos antes',
      cost: 1000,
      type: 'privilege',
      icon: <Gift className="h-6 w-6" />,
      unlocked: false,
      rarity: 'legendary'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'María González', points: 18500, level: 15, streak: 45, avatar: '👑' },
    { rank: 2, name: 'Carlos Rodríguez', points: 17200, level: 14, streak: 38, avatar: '🏆' },
    { rank: 3, name: 'Ana Martínez', points: 16800, level: 14, streak: 42, avatar: '🥉' },
    { rank: 4, name: 'Juan Pérez', points: 16200, level: 13, streak: 35, avatar: '⭐' },
    { rank: 5, name: 'Sofía López', points: 15900, level: 13, streak: 28, avatar: '🌟' },
    // Usuario actual
    { rank: 23, name: 'Tú', points: userStats.totalPoints, level: userStats.level, streak: userStats.streak, avatar: '😊', isCurrentUser: true }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const simulateNewAchievement = () => {
    const unlockedAchievements = achievements.filter(a => !a.unlocked);
    if (unlockedAchievements.length > 0) {
      const randomAchievement = unlockedAchievements[Math.floor(Math.random() * unlockedAchievements.length)];
      setNewAchievement({
        ...randomAchievement,
        unlocked: true,
        unlockedAt: new Date()
      });
      setShowNotification(true);
      
      // Actualizar puntos y experiencia
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + randomAchievement.points,
        experience: prev.experience + randomAchievement.points
      }));

      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  const getProgressPercentage = () => {
    return (userStats.experience / userStats.experienceToNext) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <Trophy className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Centro de Logros</h2>
              <p className="text-blue-100">Sigue tu progreso y desbloquea recompensas</p>
            </div>
          </div>
          <button
            onClick={simulateNewAchievement}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
          >
            Simular Logro
          </button>
        </div>

        {/* User Level & Progress */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-100">Nivel</span>
              <Crown className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold">{userStats.level}</div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-100">Puntos Totales</span>
              <Star className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-100">Racha Actual</span>
              <Flame className="h-5 w-5 text-orange-300" />
            </div>
            <div className="text-2xl font-bold">{userStats.streak} días</div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-100">Ranking</span>
              <TrendingUp className="h-5 w-5 text-green-300" />
            </div>
            <div className="text-2xl font-bold">#{userStats.rank}</div>
          </div>
        </div>

        {/* Experience Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-100">Progreso al Nivel {userStats.level + 1}</span>
            <span className="text-sm text-blue-100">
              {userStats.experience} / {userStats.experienceToNext} XP
            </span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {[
            { id: 'progress', label: 'Progreso', icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'achievements', label: 'Logros', icon: <Award className="h-4 w-4" /> },
            { id: 'leaderboard', label: 'Clasificación', icon: <Trophy className="h-4 w-4" /> },
            { id: 'rewards', label: 'Recompensas', icon: <Gift className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center py-4 px-6 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Weekly Goals */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Target className="h-6 w-6 mr-2" />
                  Objetivos de la Semana
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Asistencia Perfecta</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-lg font-bold text-green-600">5/5 días</div>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full w-full" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Puntualidad</span>
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-lg font-bold text-blue-600">4/5 días</div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full w-4/5" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Participación</span>
                      <Users className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="text-lg font-bold text-purple-600">3/3 actividades</div>
                    <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-500 h-2 rounded-full w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Logro desbloqueado: "Pro de la Puntualidad"', points: 400, time: '2 horas', type: 'achievement' },
                    { action: 'Asistencia registrada', points: 50, time: '1 día', type: 'attendance' },
                    { action: 'Racha de 15 días alcanzada', points: 150, time: '1 día', type: 'streak' },
                    { action: 'Nivel 12 alcanzado', points: 500, time: '3 días', type: 'level' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          activity.type === 'achievement' ? 'bg-yellow-500' :
                          activity.type === 'attendance' ? 'bg-green-500' :
                          activity.type === 'streak' ? 'bg-orange-500' : 'bg-purple-500'
                        }`} />
                        <span className="text-gray-900">{activity.action}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">+{activity.points} XP</div>
                        <div className="text-xs text-gray-500">hace {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Logros</h3>
                <div className="text-sm text-gray-600">
                  {achievements.filter(a => a.unlocked).length} de {achievements.length} desbloqueados
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                      achievement.unlocked 
                        ? `${getRarityBorder(achievement.rarity)} shadow-md` 
                        : 'border-gray-200 opacity-75'
                    }`}
                  >
                    {/* Rarity Indicator */}
                    <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />
                    
                    {/* Lock/Unlock Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${
                        achievement.unlocked 
                          ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white` 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6" />}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">+{achievement.points}</div>
                        <div className="text-xs text-gray-500">XP</div>
                      </div>
                    </div>

                    <h4 className={`font-bold mb-2 ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm mb-4 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>

                    {/* Progress Bar for Locked Achievements */}
                    {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progreso</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Unlock Date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-gray-500">
                        Desbloqueado: {achievement.unlockedAt.toLocaleDateString()}
                      </div>
                    )}

                    {/* Rarity Badge */}
                    <div className="absolute bottom-2 left-2">
                      <span className={`text-xs px-2 py-1 rounded-full text-white bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Clasificación Semanal</h3>
                <div className="text-sm text-gray-600">
                  Tu posición: #{userStats.rank} de {userStats.totalUsers}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 ${
                      user.isCurrentUser ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        user.isCurrentUser ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {user.rank <= 3 ? (
                          user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div className="text-2xl mr-3">{user.avatar}</div>
                      <div>
                        <div className={`font-semibold ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">Nivel {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Flame className="h-3 w-3 mr-1 text-orange-500" />
                        {user.streak} días
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Weekly Challenge */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Desafío de la Semana
                </h4>
                <p className="text-purple-800 mb-4">
                  "Mantén una asistencia perfecta durante toda la semana para ganar 500 XP extra"
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-purple-700">
                    Participantes: 847 estudiantes
                  </div>
                  <div className="text-sm font-bold text-purple-900">
                    Termina en 2 días
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Tienda de Recompensas</h3>
                <div className="text-sm text-gray-600">
                  Puntos disponibles: {userStats.totalPoints.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                      reward.unlocked 
                        ? 'border-green-300 bg-green-50' 
                        : userStats.totalPoints >= reward.cost
                        ? `${getRarityBorder(reward.rarity)} hover:scale-105 cursor-pointer`
                        : 'border-gray-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${
                        reward.unlocked 
                          ? 'bg-green-100 text-green-600'
                          : userStats.totalPoints >= reward.cost
                          ? `bg-gradient-to-r ${getRarityColor(reward.rarity)} text-white`
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {reward.unlocked ? <CheckCircle className="h-6 w-6" /> : reward.icon}
                      </div>
                      <div className="text-right">
                        {reward.unlocked ? (
                          <div className="text-green-600 font-bold">Desbloqueado</div>
                        ) : (
                          <div className={`text-lg font-bold ${
                            userStats.totalPoints >= reward.cost ? 'text-purple-600' : 'text-gray-400'
                          }`}>
                            {reward.cost.toLocaleString()} pts
                          </div>
                        )}
                      </div>
                    </div>

                    <h4 className={`font-bold mb-2 ${
                      reward.unlocked ? 'text-green-800' :
                      userStats.totalPoints >= reward.cost ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {reward.name}
                    </h4>
                    <p className={`text-sm mb-4 ${
                      reward.unlocked ? 'text-green-700' :
                      userStats.totalPoints >= reward.cost ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {reward.description}
                    </p>

                    {!reward.unlocked && (
                      <button
                        disabled={userStats.totalPoints < reward.cost}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                          userStats.totalPoints >= reward.cost
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {userStats.totalPoints >= reward.cost ? 'Canjear' : 'Puntos Insuficientes'}
                      </button>
                    )}

                    {/* Rarity Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`text-xs px-2 py-1 rounded-full text-white bg-gradient-to-r ${getRarityColor(reward.rarity)}`}>
                        {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Coming Soon */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 text-center">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-700 mb-2">Más Recompensas Próximamente</h4>
                <p className="text-gray-600">
                  Estamos trabajando en nuevas recompensas emocionantes. ¡Mantente atento!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 bg-white border-2 border-yellow-300 rounded-xl p-6 shadow-2xl max-w-sm"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full mr-4">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">¡Nuevo Logro!</h4>
                <p className="text-sm text-gray-600">Has desbloqueado una recompensa</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-full bg-gradient-to-r ${getRarityColor(newAchievement.rarity)} text-white mr-3`}>
                  {newAchievement.icon}
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">{newAchievement.name}</h5>
                  <p className="text-sm text-gray-600">{newAchievement.description}</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-yellow-600">+{newAchievement.points} XP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationPanel;