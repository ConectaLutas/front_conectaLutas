import React, { useState, useEffect } from 'react';
import ChampionshipCard from '../../components/ChampionshipCard/ChampionshipCard';
import api from '../../api/api';
import './Home.css';

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allChampionships, setAllChampionships] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Buscando campeonatos da API
  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('http://localhost:5001/Campeonato?skip=0&take=50');
        console.log(response.data);
        setAllChampionships(response.data);
      } catch (error) {
        console.error('Erro ao buscar campeonatos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampionships();
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Buscando por:', searchTerm);
  };
  const handleLoadMore = () => {
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
    }, 300);
  };

  const visibleChampionships = allChampionships.slice(0, visibleCount);
  const hasMore = visibleCount < allChampionships.length;

  return (
    <div className="home-container">
      <section className="welcome-search-section">
        <h1 className="home-title">Bem-vindo ao Conecta Lutas</h1>
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
                title={champ.nome}
                date={new Date(champ.dataInicio).toLocaleDateString()}
                location={champ.localEvento}
                image={champ.fotoUrl ? `http://localhost:5001${champ.fotoUrl}` : "https://placehold.co/600x400"}
                detailsLink={champ.linkRegulamento || '#'}
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
      </section>
    </div>
  );
};

export default Home;
