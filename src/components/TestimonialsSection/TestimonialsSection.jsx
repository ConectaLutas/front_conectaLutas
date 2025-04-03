import React from 'react';
import './TestimonialsSection.css';

// Dados Fictícios - Substitua pelos seus dados reais ou carregue de uma API
const testimonialsData = [
  { id: 1, name: 'Marina Silva', quote: 'A luta é a melhor terapia que já fiz!', image: 'https://via.placeholder.com/100/eee/000?text=MS' },
  { id: 2, name: 'Carlos Pereira', quote: 'Nunca pensei que poderia ser tão forte!', image: 'https://via.placeholder.com/100/eee/000?text=CP' },
  { id: 3, name: 'Ana Costa', quote: 'Amei participar de um campeonato anunciado nessa plataforma', image: 'https://via.placeholder.com/100/eee/000?text=AC' },
  { id: 4, name: 'Ricardo Almeida', quote: 'Sinto que posso enfrentar qualquer desafio!', image: 'https://via.placeholder.com/100/eee/000?text=RA' },
  // Adicione mais se necessário (baseado na imagem, talvez 6?)
  // { id: 5, name: 'Fernanda Lima', quote: 'A comunidade aqui é incrível e acolhedora!', image: 'https://via.placeholder.com/100/eee/000?text=FL' },
  // { id: 6, name: 'João Santos', quote: 'A luta me transformou em uma pessoa mais confiante!', image: 'https://via.placeholder.com/100/eee/000?text=JS' },
];

const TestimonialCard = ({ name, quote, image }) => (
  <div className="testimonial-card">
    <img src={image} alt={`Depoimento de ${name}`} className="testimonial-card__image" />
    <h4 className="testimonial-card__name">{name}</h4>
    {/* Estilo Figma: Inter, 21px, Medium 500, #000000 */}
    <p className="testimonial-card__quote">"{quote}"</p>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-section__container">
        {/* Estilo Figma: Inter, 42px, Bold 700, #000000 */}
        <h2 className="testimonials-section__title">Depoimentos</h2>
        <div className="testimonials-section__grid">
          {testimonialsData.map(testimonial => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;