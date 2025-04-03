import React from 'react';
import './NewsSection.css';

// Dados Fictícios - Substitua ou carregue via API
const newsData = [
  { id: 1, title: 'Campeonato Regional de Jiu Jitsu', date: '17 de Março, 2025', excerpt: 'Venha assistir ao nosso campeonato regional! Prepare-se para muita emoção e adrenalina!', image: 'https://via.placeholder.com/320x191/eee/000?text=Camp+Regional', link: '#regional' },
  { id: 2, title: 'Jiu-Jitsu ao Ar Livre', excerpt: 'Eventos especiais ao ar livre estão ganhando espaço! A conexão entre corpo e mente é essencial.', image: 'https://via.placeholder.com/320x191/eee/000?text=JJ+Ar+Livre', link: '#arlivre' },
  { id: 3, title: 'Campeã da Categoria Sub-20! 🏆', excerpt: 'Com garra e técnica apurada, a nova campeã mostrou domínio absoluto no tatame!', image: 'https://via.placeholder.com/320x191/eee/000?text=Campeã+Sub-20', link: '#campea' },
  { id: 4, title: 'Desafios e Competição', excerpt: 'Atletas estão se preparando intensamente para os próximos campeonatos. O treinamento nunca para!', image: 'https://via.placeholder.com/320x191/eee/000?text=Treinamento', link: '#desafios' },
];

const NewsCard = ({ title, date, excerpt, image, link }) => (
  <div className="news-card">
    <img src={image} alt={title} className="news-card__image" />
    <div className="news-card__content">
      {/* Estilo Figma: Poppins, 17px, Bold 700, #000000 */}
      <h3 className="news-card__title">{title}</h3>
      {date && <span className="news-card__date">{date}</span>}
      {/* Estilo Figma: Poppins, 10px, Regular/Medium 400/500, #000000 */}
      <p className="news-card__excerpt">{excerpt}</p>
      {/* Estilo Figma: Botão "saiba" */}
      <a href={link} className="news-card__link">saiba +</a>
    </div>
  </div>
);


const NewsSection = () => {
  return (
    <section className="news-section">
      <div className="news-section__container">
        {/* Estilo Figma: Inter, 42px, Bold 700, #000000 */}
        <h2 className="news-section__title">Últimas Novidades</h2>
        <div className="news-section__grid">
          {newsData.map(newsItem => (
            <NewsCard key={newsItem.id} {...newsItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;