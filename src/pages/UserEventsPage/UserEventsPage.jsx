// src/pages/UserEventsPage/UserEventsPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './UserEventsPage.css';
// import { FaChevronDown, FaChevronUp, FaTrophy } from 'react-icons/fa'; // Ícones

// Componente para o card de evento (pode ser movido para /components se reutilizado)
const EventCard = ({ evento, tipo }) => {
  const navigate = useNavigate();
  const { campeonato, categoria, statusInscricao, resultadoAtleta, linkComprovante, linkPagamento } = evento;

  const handleVerDetalhes = () => {
    navigate(`/campeonato/${campeonato.id}`);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        {/* <FaTrophy className="event-icon" /> */} <span className="event-icon">🏆</span>
        <h3>{campeonato?.nome || 'Nome do Evento Indisponível'}</h3>
      </div>
      <div className="event-card-body">
        <p><strong>Data:</strong> {formatDate(campeonato?.dataInicio)}</p>
        <p><strong>Local:</strong> {campeonato?.localEvento || 'N/A'}</p>
        <p><strong>Categoria:</strong> {categoria?.nome || 'N/A'}</p>
        {tipo === 'inscrito' && <p><strong>Status:</strong> <span className={`status-${statusInscricao?.toLowerCase().replace(' ', '-')}`}>{statusInscricao || 'N/A'}</span></p>}
        {tipo === 'concluido' && <p><strong>Resultado:</strong> {resultadoAtleta || 'N/A'}</p>}
      </div>
      <div className="event-card-actions">
        <button onClick={handleVerDetalhes} className="button-event-action button-details">Ver detalhes</button>
        {tipo === 'inscrito' && statusInscricao === 'Confirmada' && linkComprovante && (
          <a href={linkComprovante} target="_blank" rel="noopener noreferrer" className="button-event-action button-comprovante">Baixar comp.</a>
        )}
        {tipo === 'inscrito' && statusInscricao === 'Aguardando pagamento' && linkPagamento && (
          <a href={linkPagamento} target="_blank" rel="noopener noreferrer" className="button-event-action button-pagamento">Finalizar pagamento</a>
        )}
      </div>
    </div>
  );
};


const UserEventsPage = () => {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Estados para controlar se as seções estão abertas ou fechadas
  const [showInscritos, setShowInscritos] = useState(true);
  const [showConcluidos, setShowConcluidos] = useState(true);
  // const [showMeusCampeonatos, setShowMeusCampeonatos] = useState(true); // Para seção futura

  useEffect(() => {
    const fetchUserInscricoes = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }
      // O ID do atleta logado deve ser pego do token ou localStorage
      const atletaId = localStorage.getItem('loggedInAtletaId');
      if (!atletaId) {
        setError("Não foi possível identificar o atleta. Faça login novamente.");
        setLoading(false);
        navigate('/login');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Idealmente, haveria um endpoint específico tipo /api/Atleta/me/inscricoes
        // Por agora, vamos buscar os dados completos do atleta e filtrar as inscrições
        // Isso assume que a resposta de /api/Atleta/${atletaId} inclui o array 'inscricoes' detalhado.
        const response = await api.get(`/api/Atleta/${atletaId}`);
        const atletaData = response.data;
        
        // Simulação de campos que podem faltar na API
        const inscricoesProcessadas = atletaData.inscricoes?.map(insc => ({
            ...insc,
            // Adicionar simulação para campos que o backend ainda pode não ter:
            statusInscricao: insc.statusInscricao || (new Date(insc.campeonato?.dataInicio) > new Date() ? (Math.random() > 0.5 ? 'Confirmada' : 'Aguardando pagamento') : 'Concluída'),
            resultadoAtleta: insc.resultadoAtleta || (new Date(insc.campeonato?.dataInicio) < new Date() && insc.campeonato?.status === 2 ? (['1º Lugar', '2º Lugar', '3º Lugar', 'Participou'][Math.floor(Math.random() * 4)]) : null),
            linkComprovante: insc.linkComprovante || (insc.statusInscricao === 'Confirmada' ? '#' : null),
            linkPagamento: insc.linkPagamento || (insc.statusInscricao === 'Aguardando pagamento' ? '#' : null),
            // Certificar que temos a categoria, mesmo que simulada
            categoria: insc.categoria || { nome: "Categoria Exemplo" },
            campeonato: insc.campeonato || {id: insc.campeonatoId, nome: "Camp Exemplo", dataInicio: new Date().toISOString(), localEvento: "Local Exemplo", status: 0}
        })) || [];

        setInscricoes(inscricoesProcessadas);

      } catch (err) {
        console.error('Erro ao buscar inscrições do usuário:', err);
        setError(err.response?.data?.message || 'Falha ao carregar seus eventos.');
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInscricoes();
  }, [navigate]);

  const eventosInscritos = inscricoes.filter(
    // Status do Campeonato: 0 = Pendente, 1 = EmAndamento, 2 = Encerrado
    // Consideramos inscritos os que não estão encerrados (status 0 ou 1)
    insc => insc.campeonato && insc.campeonato.status !== 2 && (insc.statusInscricao === 'Confirmada' || insc.statusInscricao === 'Aguardando pagamento')
  );

  const eventosConcluidos = inscricoes.filter(
    insc => insc.campeonato && insc.campeonato.status === 2 // Apenas campeonatos encerrados
  );

  if (loading) return <p className="loading-message">Carregando seus eventos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-events-page">
      <section className="events-section">
        <div className="section-header" onClick={() => setShowInscritos(!showInscritos)}>
          <h2>Eventos Inscritos</h2>
          {/* <span className="toggle-icon">{showInscritos ? <FaChevronUp /> : <FaChevronDown />}</span> */}
          <span className="toggle-icon">{showInscritos ? '▲' : '▼'}</span>
        </div>
        {showInscritos && (
          <div className="events-list">
            {eventosInscritos.length > 0 ? (
              eventosInscritos.map(evento => (
                <EventCard key={evento.id || evento.campeonatoId} evento={evento} tipo="inscrito" />
              ))
            ) : (
              <p>Você não está inscrito em nenhum evento futuro.</p>
            )}
          </div>
        )}
      </section>

      <section className="events-section">
        <div className="section-header" onClick={() => setShowConcluidos(!showConcluidos)}>
          <h2>Eventos Concluídos</h2>
          {/* <span className="toggle-icon">{showConcluidos ? <FaChevronUp /> : <FaChevronDown />}</span> */}
          <span className="toggle-icon">{showConcluidos ? '▲' : '▼'}</span>
        </div>
        {showConcluidos && (
          <div className="events-list">
            {eventosConcluidos.length > 0 ? (
              eventosConcluidos.map(evento => (
                <EventCard key={evento.id || evento.campeonatoId} evento={evento} tipo="concluido" />
              ))
            ) : (
              <p>Você não participou de nenhum evento concluído ainda.</p>
            )}
          </div>
        )}
      </section>

      {/* Seção Meus Campeonatos (para o futuro) */}
      {/* <section className="events-section">
        <div className="section-header" onClick={() => setShowMeusCampeonatos(!showMeusCampeonatos)}>
          <h2>Meus Campeonatos</h2>
          <span className="toggle-icon">{showMeusCampeonatos ? '▲' : '▼'}</span>
        </div>
        {showMeusCampeonatos && (
          <div className="events-list">
            <p>(Conteúdo para campeonatos criados pelo usuário aqui...)</p>
          </div>
        )}
      </section>
      */}
    </div>
  );
};

export default UserEventsPage;