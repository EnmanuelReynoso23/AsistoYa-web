import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: 'AsistoYA ha transformado cómo manejamos la asistencia en nuestra escuela. Ahora puedo dedicar más tiempo a enseñar en lugar de pasar lista cada mañana.',
    name: 'Prof. Carmen Méndez',
    role: 'Docente de Secundaria',
    image: 'https://images.pexels.com/photos/8613070/pexels-photo-8613070.jpeg',
    rating: 5
  },
  {
    id: 2,
    content: 'Como madre trabajadora, me da tranquilidad recibir una notificación en el momento exacto en que mi hija llega a la escuela. Un sistema que realmente nos da paz mental.',
    name: 'Luisa Fernández',
    role: 'Madre de Familia',
    image: 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg',
    rating: 5
  },
  {
    id: 3,
    content: 'La implementación de AsistoYA redujo en un 85% el tiempo dedicado a gestionar la asistencia y mejoró significativamente nuestra comunicación con los padres.',
    name: 'Roberto Gómez',
    role: 'Director de Escuela',
    image: 'https://images.pexels.com/photos/8613934/pexels-photo-8613934.jpeg',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonios</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Lo que dicen nuestros usuarios
          </p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <blockquote className="mt-3 flex-grow">
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </blockquote>
                
                <div className="mt-4 flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;