import React, { useState } from 'react';
import { Check, X, Star, Users, School, Building, Crown, Zap, Shield, Phone, Mail, ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'mes',
    description: 'Perfecto para escuelas pequeñas que quieren probar AsistoYA',
    maxStudents: 50,
    popular: false,
    icon: <Users className="h-8 w-8" />,
    color: 'gray',
    features: [
      'Hasta 50 estudiantes',
      'Reconocimiento facial básico',
      'Notificaciones SMS (50/mes)',
      'Reportes básicos',
      'Soporte por email',
      'Almacenamiento 30 días'
    ],
    limitations: [
      'Sin app móvil para padres',
      'Sin integración con sistemas',
      'Sin reportes avanzados',
      'Sin soporte telefónico'
    ],
    cta: 'Comenzar Gratis',
    ctaType: 'primary'
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 2500,
    period: 'mes',
    description: 'Ideal para escuelas primarias y colegios pequeños',
    maxStudents: 300,
    popular: false,
    icon: <School className="h-8 w-8" />,
    color: 'blue',
    features: [
      'Hasta 300 estudiantes',
      'Reconocimiento facial avanzado',
      'App móvil para padres',
      'Notificaciones SMS ilimitadas',
      'Notificaciones push gratuitas',
      'Reportes detallados',
      'Soporte telefónico',
      'Almacenamiento 90 días',
      'Panel administrativo completo'
    ],
    limitations: [
      'Sin integración con sistemas externos',
      'Sin análisis predictivo'
    ],
    cta: 'Elegir Básico',
    ctaType: 'primary'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4500,
    period: 'mes',
    description: 'La opción más popular para escuelas medianas',
    maxStudents: 800,
    popular: true,
    icon: <Star className="h-8 w-8" />,
    color: 'purple',
    features: [
      'Hasta 800 estudiantes',
      'Reconocimiento facial de alta precisión',
      'App móvil premium para padres',
      'Notificaciones SMS y push ilimitadas',
      'Gamificación para estudiantes',
      'Reportes avanzados y analytics',
      'Integración con sistemas escolares',
      'Soporte prioritario 24/7',
      'Almacenamiento 1 año',
      'API para desarrolladores',
      'Múltiples cámaras'
    ],
    limitations: [],
    cta: 'Elegir Premium',
    ctaType: 'gradient'
  },
  {
    id: 'pro',
    name: 'Profesional',
    price: 7500,
    period: 'mes',
    description: 'Para instituciones grandes con múltiples sedes',
    maxStudents: 2000,
    popular: false,
    icon: <Building className="h-8 w-8" />,
    color: 'indigo',
    features: [
      'Hasta 2,000 estudiantes',
      'Reconocimiento facial empresarial',
      'App móvil white-label',
      'Comunicaciones ilimitadas',
      'Análisis predictivo de ausentismo',
      'Dashboard ejecutivo',
      'Integración completa con SIS',
      'Soporte dedicado',
      'Almacenamiento ilimitado',
      'API completa',
      'Múltiples sedes',
      'Capacitación incluida'
    ],
    limitations: [],
    cta: 'Elegir Profesional',
    ctaType: 'primary'
  },
  {
    id: 'institutional',
    name: 'Institucional',
    price: null,
    period: 'personalizado',
    description: 'Solución empresarial para distritos escolares y ministerios',
    maxStudents: 'Ilimitado',
    popular: false,
    icon: <Crown className="h-8 w-8" />,
    color: 'gold',
    features: [
      'Estudiantes ilimitados',
      'Implementación personalizada',
      'Infraestructura dedicada',
      'Integración completa con MINERD',
      'Análisis de big data',
      'Dashboard nacional/regional',
      'Soporte 24/7 dedicado',
      'Capacitación completa',
      'Consultoría incluida',
      'SLA garantizado',
      'Cumplimiento normativo',
      'Implementación gradual'
    ],
    limitations: [],
    cta: 'Contactar Ventas',
    ctaType: 'outline'
  }
];

const benefits = [
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: 'Sin Hardware Especial',
    description: 'Funciona con cualquier cámara web estándar. No necesitas equipos costosos.'
  },
  {
    icon: <Shield className="h-6 w-6 text-green-500" />,
    title: '100% en la Nube',
    description: 'Acceso desde cualquier lugar, actualizaciones automáticas y respaldo seguro.'
  },
  {
    icon: <Phone className="h-6 w-6 text-purple-500" />,
    title: 'Notificaciones Gratuitas',
    description: 'Push notifications ilimitadas. SMS incluidos en todos los planes de pago.'
  },
  {
    icon: <Users className="h-6 w-6 text-orange-500" />,
    title: 'Accesible para Todos',
    description: 'Precios especiales para escuelas públicas y organizaciones sin fines de lucro.'
  }
];

const faqs = [
  {
    question: '¿Hay descuentos para escuelas públicas?',
    answer: 'Sí, ofrecemos descuentos del 40% para escuelas públicas y del 30% para organizaciones sin fines de lucro. Contacta a nuestro equipo para más detalles.'
  },
  {
    question: '¿Puedo cambiar de plan en cualquier momento?',
    answer: 'Absolutamente. Puedes actualizar o reducir tu plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturación.'
  },
  {
    question: '¿Qué incluye la implementación?',
    answer: 'Incluye configuración del sistema, capacitación del personal, migración de datos existentes y soporte durante las primeras 2 semanas.'
  },
  {
    question: '¿Hay contratos a largo plazo?',
    answer: 'No requerimos contratos anuales. Puedes pagar mes a mes, aunque ofrecemos descuentos del 15% por pagos anuales anticipados.'
  }
];

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorStudents, setCalculatorStudents] = useState(100);

  const getRecommendedPlan = (students: number) => {
    if (students <= 50) return 'free';
    if (students <= 300) return 'basic';
    if (students <= 800) return 'premium';
    if (students <= 2000) return 'pro';
    return 'institutional';
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Personalizado';
    const yearlyPrice = billingPeriod === 'yearly' ? price * 10 : price; // 15% discount for yearly
    return `RD$${yearlyPrice.toLocaleString()}`;
  };

  const getPlanColor = (color: string, type: 'bg' | 'border' | 'text' | 'button') => {
    const colors = {
      gray: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-600',
        button: 'bg-gray-600 hover:bg-gray-700'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-600',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      },
      gold: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-600',
        button: 'bg-yellow-600 hover:bg-yellow-700'
      }
    };
    return colors[color as keyof typeof colors][type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Planes y Precios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Elige el plan perfecto para tu institución educativa. Todos los planes incluyen soporte técnico y actualizaciones gratuitas.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Anual
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Ahorra 15%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Calculator Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setShowCalculator(!showCalculator)}
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculadora de Plan Recomendado
          </motion.button>

          {/* Calculator */}
          {showCalculator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold mb-4">¿Cuántos estudiantes tienes?</h3>
              <input
                type="number"
                value={calculatorStudents}
                onChange={(e) => setCalculatorStudents(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Número de estudiantes"
              />
              <div className="text-center">
                <p className="text-gray-600 mb-2">Plan recomendado:</p>
                <p className="text-xl font-bold text-blue-600">
                  {plans.find(p => p.id === getRecommendedPlan(calculatorStudents))?.name}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-purple-300 ring-2 ring-purple-200 transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getPlanColor(plan.color, 'bg')} mb-4`}>
                    <div className={getPlanColor(plan.color, 'text')}>
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    {plan.price === null ? (
                      <div className="text-2xl font-bold text-gray-900">Personalizado</div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-gray-900">
                          {formatPrice(plan.price)}
                        </div>
                        <div className="text-sm text-gray-500">
                          por {billingPeriod === 'yearly' ? 'año' : 'mes'}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Max Students */}
                  <div className="text-sm text-gray-600 mb-6">
                    <Users className="h-4 w-4 inline mr-1" />
                    {typeof plan.maxStudents === 'number' 
                      ? `Hasta ${plan.maxStudents.toLocaleString()} estudiantes`
                      : plan.maxStudents
                    }
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-start">
                      <X className="h-4 w-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    plan.ctaType === 'gradient'
                      ? getPlanColor(plan.color, 'button')
                      : plan.ctaType === 'outline'
                      ? 'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      : getPlanColor(plan.color, 'button')
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Beneficios Clave de AsistoYA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl text-white p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Transformar tu Escuela?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Solicita una demostración gratuita y descubre cómo AsistoYA puede revolucionar la gestión de asistencia en tu institución.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              Solicitar Demo Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
              <Mail className="h-5 w-5 mr-2" />
              Contactar Ventas
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            Sin compromiso • Configuración gratuita • Soporte incluido
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            ¿Necesitas un plan personalizado o tienes preguntas específicas?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+18091234567"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              +1 (809) 123-4567
            </a>
            <a
              href="mailto:ventas@asistoya.com"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Mail className="h-4 w-4 mr-2" />
              ventas@asistoya.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;