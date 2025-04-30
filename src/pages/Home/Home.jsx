// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import ChampionshipCard from '../../components/ChampionshipCard/ChampionshipCard';
import './Home.css';

// --- MOCK DATA (sem alterações) ---
const MOCK_CHAMPIONSHIPS = [
  { id: 'c1', title: 'Copa Litoral Catarinense de Jiu-Jitsu', date: '15/06/2025', location: 'Itajaí, SC', image: 'https://via.placeholder.com/400x250/0D3B66/FFFFFF?text=Copa+Litoral', detailsLink: '#' },
  { id: 'c2', title: 'Aberto de Verão - Jaraguá do Sul', date: '27/07/2025', location: 'Jaraguá do Sul, SC', image: 'https://via.placeholder.com/400x250/F9A826/000000?text=Aberto+Verão', detailsLink: '#' },
  { id: 'c3', title: 'Blumenau International Pro BJJ', date: '10/08/2025', location: 'Blumenau, SC', image: 'https://via.placeholder.com/400x250/6c757d/FFFFFF?text=Blumenau+Pro', detailsLink: '#' },
  { id: 'c4', title: 'Campeonato Estadual Kids', date: '24/08/2025', location: 'Florianópolis, SC', image: 'https://via.placeholder.com/400x250/212529/FFFFFF?text=Estadual+Kids', detailsLink: '#' },
  { id: 'c5', title: 'Desafio dos Faixas Pretas', date: '14/09/2025', location: 'Joinville, SC', image: 'https://via.placeholder.com/400x250/0D3B66/FFFFFF?text=Desafio+Pretas', detailsLink: '#' },
  { id: 'c6', title: 'Copa Integração BJJ', date: '05/10/2025', location: 'Balneário Camboriú, SC', image: 'https://via.placeholder.com/400x250/F9A826/000000?text=Copa+Integração', detailsLink: '#' },
  { id: 'c7', title: 'Sul Brasileiro de Jiu-Jitsu', date: '19/10/2025', location: 'Porto Alegre, RS', image: 'https://via.placeholder.com/400x250/0D3B66/FFFFFF?text=Sul+Brasileiro', detailsLink: '#' },
  { id: 'c8', title: 'GP No-Gi Vale Europeu', date: '02/11/2025', location: 'Pomerode, SC', image: 'https://via.placeholder.com/400x250/F9A826/000000?text=GP+No-Gi', detailsLink: '#' },
  { id: 'c9', title: 'Copa dos Campeões', date: '16/11/2025', location: 'Curitiba, PR', image: 'https://via.placeholder.com/400x250/6c757d/FFFFFF?text=Copa+Campeões', detailsLink: '#' },
];
// --- FIM MOCK DATA ---

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allChampionships, setAllChampionships] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAllChampionships(MOCK_CHAMPIONSHIPS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Buscando por:', searchTerm);
  };
  const handleLoadMore = () => {
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
    }, 300);
  };

  const visibleChampionships = allChampionships.slice(0, visibleCount);
  const hasMore = visibleCount < allChampionships.length;

  return (
    <div className="home-container">
      {/* Seção de Boas-Vindas e Busca (sem alterações) */}
      <section className="welcome-search-section">
        {/* ... (código do título, subtítulo, busca) ... */}
         <h1 className="home-title">Bem-vindo ao Jiu-Jitsu Online</h1>
         <p className="home-subtitle">A plataforma para campeonatos e disputas</p>
         <form className="search-bar-container" onSubmit={handleSearchSubmit}>
           <input
             type="search"
             className="search-input"
             placeholder="Busque por localidade, eventos..."
             value={searchTerm}
             onChange={handleSearchChange}
             aria-label="Buscar campeonatos"
           />
           <button type="submit" className="search-button" aria-label="Buscar">
             Buscar
           </button>
         </form>
      </section>

      {/* Seção de Campeonatos - REMOVIDO o <div className="container"> daqui */}
      <section className="championships-section">
          <h2>Próximos Campeonatos</h2>
          {isLoading ? (
            <p className="loading-message">Carregando campeonatos...</p>
          ) : visibleChampionships.length > 0 ? (
            <>
              <div className="championships-grid">
                {visibleChampionships.map((champ) => (
                  <ChampionshipCard
                    key={champ.id}
                    title={champ.title}
                    date={champ.date}
                    location={champ.location}
                    image={champ.image}
                    detailsLink={champ.detailsLink}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="load-more-container">
                  <button
                    onClick={handleLoadMore}
                    className="button button--load-more"
                  >
                    Carregar Mais Eventos
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="empty-message">Nenhum campeonato encontrado no momento.</p>
          )}
       {/* FIM da área que estava dentro do container */}
      </section>
    </div>
  );
};

export default Home;