import React from 'react';

// Importar os componentes de seção
// Ajuste os caminhos '../' conforme a sua estrutura exata
import HeroSection from '../../components/HeroSection/HeroSection';
import InfoSection from '../../components/InfoSection/InfoSection';
import MissionSection from '../../components/MissionSection/MissionSection';
import PromoBannerSection from '../../components/PromoBannerSection/PromoBannerSection';
import ExplanationSection from '../../components/ExplanationSection/ExplanationSection';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import NewsSection from '../../components/NewsSection/NewsSection';

// Opcional: importar estilos específicos para a página Home, se houver
// import './Home.css';

const Home = () => {
  return (
    // Usar React.Fragment <>...</> ou <main> para envolver as seções
    // <main> é semanticamente mais correto para o conteúdo principal da página
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