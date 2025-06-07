import React, { useState } from 'react';
import { Menu, X, Bell, User, School } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', id: 'hero', path: '/' },
    { name: 'Cómo Funciona', id: 'how-it-works', path: '/how-it-works' },
    { name: 'Para Escuelas', id: 'features', path: '/for-schools' },
    { name: 'Para Padres', id: 'testimonials', path: '/for-parents' },
    { name: 'Demo', id: 'demo', path: '/demo' },
    { name: 'Precios', id: 'pricing', path: '/pricing' },
    { name: 'Gamificación', id: 'gamification', path: '/gamification' },
    { name: 'Contacto', id: 'contact', path: '/#contact' }
  ];

  const handleNavigation = (link: typeof navLinks[0]) => {
    if (link.path.startsWith('/#')) {
      scrollToSection(link.id);
    } else {
      window.scrollTo(0, 0);
      navigate(link.path);
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation(navLinks[0])} 
              className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
            >
              <School className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">AsistoYA</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${location.pathname === link.path 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <Bell className="h-6 w-6" />
            </button>
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Iniciar Sesión
            </button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                  ${location.pathname === link.path 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-gray-100 p-2" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Iniciar Sesión</div>
                <div className="text-sm font-medium text-gray-500">Accede a tu cuenta</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;