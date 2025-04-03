import React from 'react';
import './MissionSection.css';
// Importe a imagem
import infoImage from '../../assets/images/info-section.png'; // Certifique-se que o caminho está correto

const MissionSection = () => {
  return (
    <section className="mission">
      {/* Container para o layout flexível */}
      <div className="mission__container">
        {/* Container específico para a imagem */}
        <div className="mission__image-container">
          <img src={infoImage} alt="Grupo treinando Jiu-Jitsu em um tatame" /> {/* Alt text mais descritivo */}
        </div>
        {/* Container específico para o texto */}
        <div className="mission__text-container">
          <h2>Nossa Missão e Visão de Futuro</h2>
          <p>
            Nossa missão é fornecer um Serviço Online que ajude o Organizador de Eventos na realização
            e controle dos seus eventos.
          </p>
          <p> {/* Separar parágrafos para melhor semântica */}
            Temos como visão de futuro oferecer o serviço mais completo com o reconhecimento nacional
            do melhor portal para a Gestão Operacional dos Eventos Online.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;