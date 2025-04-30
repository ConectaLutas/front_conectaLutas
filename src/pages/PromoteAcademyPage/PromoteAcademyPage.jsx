import React from 'react';

// Importar os componentes de seção que estavam na Home antiga
import HeroSection from '../../components/HeroSection/HeroSection';
import InfoSection from '../../components/InfoSection/InfoSection';
import MissionSection from '../../components/MissionSection/MissionSection';
import PromoBannerSection from '../../components/PromoBannerSection/PromoBannerSection';
import ExplanationSection from '../../components/ExplanationSection/ExplanationSection';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import NewsSection from '../../components/NewsSection/NewsSection';

// Opcional: Crie e importe um CSS específico se necessário
// import './PromoteAcademyPage.css';

// RENOMEAR A FUNÇÃO AQUI
const PromoteAcademyPage = () => {
  return (
    // Usar <main> ou React.Fragment
    <main>
      {/* Todo o conteúdo que estava antes em Home.jsx */}
      <HeroSection />
      <InfoSection />
      <MissionSection />
      <PromoBannerSection />
      <ExplanationSection />
      <BenefitsSection />
      <TestimonialsSection />
      <NewsSection />
      {/* Adicione aqui outras seções que pertenciam à Home antiga, se houver */}
    </main>
  );
};

// EXPORTAR COM O NOVO NOME
export default PromoteAcademyPage;