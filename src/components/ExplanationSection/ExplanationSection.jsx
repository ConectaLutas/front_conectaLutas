import React from 'react';
import './ExplanationSection.css';
import explanationImage from '../../assets/images/explanation-image.png';

 

const ExplanationSection = () => {
  return (
    <section className="explanation-section">
      <div className="explanation-section__container">
        <div className="explanation-section__text">
          {/* Usando o estilo Poppins 30px 600 #1E1616 */}
          <p>
            Um sistema para auxiliar os líderes e professores das academias.
            É uma plataforma simples, prática e de melhor custo-benefício,
            obtendo todos os controles e acompanhamentos necessários
            para um melhor funcionamento das rotinas diárias.
          </p>
        </div>
        <div className="explanation-section__image">
          {/* !! SUBSTITUA PELA SUA IMAGEM !! */}
           <img
            src={explanationImage}
            alt="Lutadores de Jiu-Jitsu" 
          />
        </div>
      </div>
    </section>
  );
};

export default ExplanationSection;