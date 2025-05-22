import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FaceRecognitionDemo from '../components/FaceRecognitionDemo';
import ParentAppDemo from '../components/ParentAppDemo';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <Features />
      <div className="bg-white py-12" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Demostración</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Mira cómo funciona AsistoYA
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Reconocimiento facial en tiempo real con notificaciones instantáneas para padres y administradores escolares.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FaceRecognitionDemo />
            <ParentAppDemo />
          </div>
        </div>
      </div>
      <Testimonials />
      <div id="contact">
        <ContactForm />
      </div>
    </div>
  );
};

export default HomePage;