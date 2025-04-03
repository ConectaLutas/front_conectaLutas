import React from 'react';
import './InfoSection.css';

const InfoSection = () => {
  return (
    // Considerar usar <article> se for um conteúdo autônomo
    <section className="info">
      <div className="info__content"> {/* Wrapper para o conteúdo */}
        <h2>O que é, para que serve...</h2>
        <p>
          Somos um Serviço Online para atender Organizadores de Eventos de Lutas Jiu - Jitsu,
          seja ele pessoa física ou jurídica, visando o apoio na organização e realização dos seus
          eventos de forma simples e fácil, cobrindo todas as áreas que um evento de luta envolve.
        </p>
      </div>
    </section>
  );
};

export default InfoSection;