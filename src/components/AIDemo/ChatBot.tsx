import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de AsistoYA. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'es-ES';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();

    // Simple rule-based responses (in a real app, you'd use OpenAI API)
    if (lowerMessage.includes('asistencia') || lowerMessage.includes('reconocimiento')) {
      return 'AsistoYA utiliza tecnología de reconocimiento facial avanzada para registrar automáticamente la asistencia de los estudiantes. Cuando un estudiante entra a la escuela, nuestro sistema lo identifica y envía una notificación inmediata a los padres.';
    }
    
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto')) {
      return 'Nuestros planes se adaptan al tamaño de tu institución. Para escuelas pequeñas (hasta 200 estudiantes) el costo es de $299/mes. Para instituciones más grandes, ofrecemos planes personalizados. ¿Te gustaría que un especialista se contacte contigo?';
    }
    
    if (lowerMessage.includes('seguridad') || lowerMessage.includes('privacidad') || lowerMessage.includes('datos')) {
      return 'La seguridad es nuestra prioridad. Utilizamos encriptación de extremo a extremo, cumplimos con GDPR y todas las regulaciones de privacidad. Los datos biométricos se procesan localmente y nunca se almacenan en servidores externos.';
    }
    
    if (lowerMessage.includes('instalacion') || lowerMessage.includes('implementar') || lowerMessage.includes('como funciona')) {
      return 'La implementación es muy sencilla: 1) Instalamos las cámaras en los puntos de entrada, 2) Configuramos el sistema con los datos de los estudiantes, 3) Capacitamos al personal, 4) ¡Listo! Todo el proceso toma entre 2-3 días.';
    }
    
    if (lowerMessage.includes('padres') || lowerMessage.includes('notificaciones') || lowerMessage.includes('app')) {
      return 'Los padres reciben notificaciones instantáneas a través de nuestra app móvil y SMS cuando sus hijos llegan o salen de la escuela. También pueden ver el historial de asistencia y estadísticas detalladas.';
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('saludos')) {
      return '¡Hola! Es un placer ayudarte. Soy el asistente de AsistoYA y estoy aquí para resolver todas tus dudas sobre nuestro sistema de asistencia automatizada. ¿Qué te gustaría saber?';
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('perfecto') || lowerMessage.includes('excelente')) {
      return '¡De nada! Me alegra poder ayudarte. Si tienes más preguntas sobre AsistoYA o quieres solicitar una demostración, no dudes en preguntarme. ¿Hay algo más en lo que pueda asistirte?';
    }

    // Default responses
    const defaultResponses = [
      'Esa es una excelente pregunta. AsistoYA está diseñado para hacer la gestión de asistencia más eficiente y segura. ¿Te gustaría saber más sobre alguna característica específica?',
      'Entiendo tu consulta. Nuestro sistema ha ayudado a más de 500 escuelas a mejorar su gestión de asistencia. ¿Qué aspecto te interesa más: la tecnología, la implementación o los beneficios?',
      'Me parece muy interesante tu pregunta. AsistoYA ofrece una solución integral para escuelas modernas. ¿Podrías ser más específico sobre lo que necesitas saber?',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const quickQuestions = [
    '¿Cómo funciona el reconocimiento facial?',
    '¿Cuánto cuesta implementar AsistoYA?',
    '¿Qué tan seguro es el sistema?',
    '¿Cómo reciben notificaciones los padres?',
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-96">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Asistente Virtual AsistoYA</h3>
            <p className="text-sm opacity-90">Siempre disponible para ayudarte</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
          </div>
          
          {recognitionRef.current && (
            <button
              onClick={toggleVoiceInput}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTyping ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;