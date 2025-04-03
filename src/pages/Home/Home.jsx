import React from 'react';

// Importar os componentes de seção
import HeroSection from '../../components/HeroSection/HeroSection';
import InfoSection from '../../components/InfoSection/InfoSection';
import MissionSection from '../../components/MissionSection/MissionSection';
import PromoBannerSection from '../../components/PromoBannerSection/PromoBannerSection';
import ExplanationSection from '../../components/ExplanationSection/ExplanationSection';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import NewsSection from '../../components/NewsSection/NewsSection';

// Certifique-se de que NÃO HÁ importação de './Header.css' ou similar aqui.
// A linha abaixo deve estar comentada ou removida se existir:
// import './Home.css'; // Só descomente se você CRIAR um Home.css específico

const Home = () => {
  return (
    // Usar React.Fragment <>...</> ou <main> para envolver as seções
    <main>
      <HeroSection />
      <InfoSection />
      <MissionSection />
      <PromoBannerSection />
      <ExplanationSection />
      <BenefitsSection />
      <TestimonialsSection />
      <NewsSection />
      {/* Adicione aqui outras seções que pertençam à Home Page */}
    </main>
  );
};

export default Home;