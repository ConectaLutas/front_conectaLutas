import React from 'react';
import './PromoBannerSection.css';
// Importe a imagem de fundo real aqui
// import promoBgImage from '../../assets/images/promo-banner-bg.jpg'; // Exemplo

const PromoBannerSection = () => {
  // Estilo inline para facilitar a aplicação da imagem de fundo importada
  // const sectionStyle = {
  //   backgroundImage: `url(${promoBgImage})`
  // };

  return (
    // <section className="promo-banner" style={sectionStyle}>
    <section className="promo-banner"> {/* Remova style se não importar img */}
      <div className="promo-banner__overlay"> {/* Camada para escurecer/filtrar fundo */}
        <div className="promo-banner__content">
          {/* Usando o estilo Poppins 77px Verde com sombra do Figma */}
          <h1 className="promo-banner__title">Jiu-Jitsu Online</h1>
          {/* Usando o estilo Poppins 30px Preto */}
          <p className="promo-banner__subtitle">
            Transforme a gestão de campeonatos de Jiu-Jitsu em uma experiência épica!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerSection;