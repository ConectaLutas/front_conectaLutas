import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewsSection.css'; // Usará variáveis

// --- MOCK DATA (Dados Fictícios) ---
// No futuro, isso virá da API
const MOCK_NEWS_DATA = [
  { id: 1, title: 'Campeonato Regional de Jiu Jitsu', date: '17 de Março, 2025', excerpt: 'Venha assistir ao nosso campeonato regional! Prepare-se para muita emoção e adrenalina!', image: 'https://via.placeholder.com/320x191/eee/000?text=Camp+Regional', link: '#regional' },
  { id: 2, title: 'Jiu-Jitsu ao Ar Livre', date: null, excerpt: 'Eventos especiais ao ar livre estão ganhando espaço! A conexão entre corpo e mente é essencial.', image: 'https://via.placeholder.com/320x191/eee/000?text=JJ+Ar+Livre', link: '#arlivre' },
  { id: 3, title: 'Campeã da Categoria Sub-20! 🏆', date: '28 de Abril, 2025', excerpt: 'Com garra e técnica apurada, a nova campeã mostrou domínio absoluto no tatame!', image: 'https://via.placeholder.com/320x191/eee/000?text=Campeã+Sub-20', link: '#campea' },
  { id: 4, title: 'Desafios e Competição', date: null, excerpt: 'Atletas estão se preparando intensamente para os próximos campeonatos. O treinamento nunca para!', image: 'https://via.placeholder.com/320x191/eee/000?text=Treinamento', link: '#desafios' },
];
// --- FIM MOCK DATA ---


// --- Componente NewsCard (Refatorado com PropTypes) ---
const NewsCard = ({ title, date, excerpt, image, link }) => (
  <div className="news-card">
    <img src={image || 'caminho/para/placeholder-imagem.png'} alt={`Notícia sobre ${title}`} className="news-card__image" loading="lazy" /> {/* loading lazy */}
    <div className="news-card__content">
      <h3 className="news-card__title">{title}</h3>
      {/* Renderiza a data apenas se ela existir */}
      {date && <span className="news-card__date">{date}</span>}
      <p className="news-card__excerpt">{excerpt}</p>
      {/* TODO: Fazer este link navegar para uma página de detalhe */}
      <a href={link || '#'} className="button button--read-more">
        Leia Mais {/* Texto mais descritivo */}
      </a>
    </div>
  </div>
);

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string, // Data é opcional
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string, // Imagem opcional (pode ter placeholder)
  link: PropTypes.string,  // Link opcional
};

NewsCard.defaultProps = {
  date: null,
  image: 'https://via.placeholder.com/320x191/eee/aaa?text=Sem+Imagem', // Placeholder padrão
  link: '#',
};
// --- Fim NewsCard ---


// --- Componente NewsSection (Principal com Fetching Simulado) ---
const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]); // Estado para os dados
  const [isLoading, setIsLoading] = useState(true); // Estado de loading inicial
  const [error, setError] = useState(null); // Estado para erros de fetch

  // useEffect para buscar dados quando o componente montar
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Iniciando busca simulada de notícias...");

      try {
        // --- Simulação/Placeholder de Chamada API ---
        // TODO: Substituir pela chamada fetch() ou axios() real para /api/news
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay da rede
        // Simulando erro (descomente para testar)
        // throw new Error("Não foi possível carregar as notícias.");

        // Se sucesso:
        console.log("Notícias carregadas (simulado).");
        setNewsItems(MOCK_NEWS_DATA); // Define os dados no estado
        // --- Fim da Simulação ---

      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        setError(err.message || "Falha ao carregar notícias.");
      } finally {
        setIsLoading(false); // Termina o loading
      }
    };

    fetchNews(); // Chama a função de busca
  }, []); // Array de dependências vazio [], executa apenas uma vez na montagem


  // --- Renderização Condicional ---
  const renderContent = () => {
    if (isLoading) {
      // TODO: Substituir por um componente de Spinner/Loading mais elaborado
      return <p className="loading-message">Carregando notícias...</p>;
    }
    if (error) {
      return <p className="error-message">Erro: {error}</p>;
    }
    if (newsItems.length === 0) {
      return <p className="empty-message">Nenhuma notícia encontrada no momento.</p>;
    }
    // Renderiza os cards se houver dados
    return (
      <div className="news-section__grid">
        {newsItems.map(item => (
          <NewsCard key={item.id} {...item} /> // Usa o ID como key
        ))}
      </div>
    );
  };
  // --- Fim Renderização Condicional ---


  return (
    <section className="news-section">
      {/* Usar container global se definido em index.css */}
      <div className="container">
        <h2 className="news-section__title">Últimas Novidades</h2>
        {renderContent()} {/* Chama a função que decide o que renderizar */}
      </div>
    </section>
  );
};

// NewsSection não tem props externas
// NewsSection.propTypes = {};

export default NewsSection;