import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AsistoYA</h3>
            <p className="text-gray-300 mb-4">
              Sistema automatizado de asistencia escolar con reconocimiento facial y notificaciones en tiempo real para padres y escuelas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Inicio</a></li>
              <li><a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">Cómo Funciona</a></li>
              <li><a href="/for-schools" className="text-gray-300 hover:text-white transition-colors duration-200">Para Escuelas</a></li>
              <li><a href="/for-parents" className="text-gray-300 hover:text-white transition-colors duration-200">Para Padres</a></li>
              <li><a href="/demo" className="text-gray-300 hover:text-white transition-colors duration-200">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@asistoya.com" className="text-gray-300 hover:text-white transition-colors duration-200">info@asistoya.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+18091234567" className="text-gray-300 hover:text-white transition-colors duration-200">+1 (809) 123-4567</a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span className="text-gray-300">Santo Domingo, República Dominicana</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Boletín</h3>
            <p className="text-gray-300 mb-4">Suscríbete para recibir actualizaciones sobre AsistoYA.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} AsistoYA. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Términos de Servicio</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;