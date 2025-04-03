import React from 'react';
import './BenefitsSection.css';
import benefitsImageMale from '../../assets/images/benefits-male.png';
import benefitsImageFemale from '../../assets/images/benefits-female.png';

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="benefits-section__container">
        <div className="benefits-section__text">
          {/* Estilo Figma: Arimo, 43px, Bold 700, #00754A */}
          <h2>Seja visto por milhares de pessoas</h2>
          {/* Estilo Figma: Spectral SC, 27px, ExtraBold 800, #1E1616 */}
          <h3>Tenha + Alunos e Aumente o Seu Faturamento</h3>
        </div>
        <div className="benefits-section__images">
          {/* !! SUBSTITUA PELAS SUAS IMAGENS !! */}
          <img src={benefitsImageMale} alt="Homem lutador de Jiu-Jitsu" className="benefits-section__img" />
          <img src={benefitsImageFemale} alt="Mulher lutadora de Jiu-Jitsu" className="benefits-section__img" />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;