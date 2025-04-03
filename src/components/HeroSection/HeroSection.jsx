import React from 'react';
import './HeroSection.css';
// Importe a imagem aqui
import bannerImage from '../../assets/images/banner.jpg'; // Certifique-se que o caminho está correto

const HeroSection = () => {
  // Estilo inline para definir a imagem de fundo dinamicamente
  const heroStyle = {
    backgroundImage: `url(${bannerImage})`
  };

  return (
    // Use <section> ou <div role="banner"> dependendo da semântica geral da página
    <section className="hero" style={heroStyle}>
      {/* Overlay como um elemento separado para melhor controle */}
      <div className="hero__overlay">
        <div className="hero__content">
          <h1>Campeonatos, Lutas</h1>
          <p>
            Pensou em fazer um evento? <br />
            Quer participar de Campeonatos? <br />
            Essa plataforma é ideal para você <br />
            {/* Considerar tornar "Clique AQUI" um botão ou link real */}
            <a href="#saiba-mais" className="hero__cta-link">Clique AQUI e confira!!</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;