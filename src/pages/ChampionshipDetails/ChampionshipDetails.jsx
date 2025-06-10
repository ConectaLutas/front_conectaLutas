// src/pages/ChampionshipDetails/ChampionshipDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } // Adicionar useNavigate
  from 'react-router-dom';
import api from '../../api/api';
import './ChampionshipDetails.css';

const ChampionshipDetails = () => {
  const { id } = useParams();
  const [championship, setChampionship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inscriptionStatus, setInscriptionStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); // Para controlar a aba ativa
  const [inscritos, setInscritos] = useState([]);
  const [inscritosLoading, setInscritosLoading] = useState(false);
  const [inscritosError, setInscritosError] = useState(null);
  const navigate = useNavigate(); // Para o botão Inscrever-se

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/Campeonato/${id}`);
        setChampionship(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes do campeonato:', err);
        setError(err.response?.data?.message || 'Falha ao carregar detalhes do campeonato.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Função para buscar inscritos
  const fetchInscritos = async () => {
    if (inscritosLoading || inscritos.length > 0) return; // Evita múltiplas chamadas
    
    setInscritosLoading(true);
    setInscritosError(null);
    try {
      const response = await api.get(`/Campeonato/${id}/inscritos`);
      setInscritos(response.data);
    } catch (err) {
      console.error('Erro ao buscar inscritos:', err);
      setInscritosError('Erro ao carregar lista de inscritos.');
    } finally {
      setInscritosLoading(false);
    }
  };

  // Carregar inscritos quando a aba for selecionada
  useEffect(() => {
    if (activeTab === 'inscritos') {
      fetchInscritos();
    }
  }, [activeTab]);

  const handleInscricao = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Idealmente, redirecionar para login com uma mensagem
      alert('Você precisa estar logado para se inscrever.');
      navigate('/login?redirect=/campeonato/' + id); // Exemplo de redirecionamento
      return;
    }

    setInscriptionStatus('Processando inscrição...');
    try {
      // O payload é vazio, o backend pega o atleta pelo token
      const response = await api.post(`/api/Inscricao/${id}/inscrever`, {});
      setInscriptionStatus(response.data.mensagem || 'Inscrição realizada com sucesso!');
    } catch (err) {
      console.error('Erro na requisição de inscrição:', err.response || err);
      let apiError = 'Erro na inscrição. Verifique se você já está inscrito ou se seus dados estão completos no perfil.';
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          apiError = err.response.data;
        } else if (err.response.data.message) {
          apiError = err.response.data.message;
        } else if (err.response.data.errors) {
          // Para lidar com erros de validação do ASP.NET Core
           const errorMessages = Object.values(err.response.data.errors).flat();
           apiError = errorMessages.join(' ');
        } else if (err.response.data.title) { // Erro padrão do ASP.NET Core ProblemDetails
            apiError = err.response.data.title;
        }
      }
      setInscriptionStatus(`Erro: ${apiError}`);
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return 'Data não definida';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };
  
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Data e hora não definidos';
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pendente';
      case 1:
        return 'Em Andamento';
      case 2:
        return 'Encerrado';
      default:
        return 'Status não definido';
    }
  };


  if (isLoading) return <p className="loading-message">Carregando detalhes do campeonato...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!championship) return <p className="empty-message">Campeonato não encontrado.</p>;


  return (
    <div className="championship-details-page">
      <section className="champ-header-section">
        <div className="champ-header-content">
          <div className="champ-image-container">
            <img
              src={championship.fotoUrl ? `https://api-conectalutas.onrender.com${championship.fotoUrl}` : "https://placehold.co/600x400/0D3B66/F9A826?text=Evento"}
              alt={`Banner do ${championship.nome}`}
              className="champ-main-image"
            />
          </div>
          <div className="champ-info-container">
            <h1>{championship.nome}</h1>
            <p className="champ-date">
              <span role="img" aria-label="Calendário">🗓️</span> Data: {formatDate(championship.dataInicio)}
              {championship.dataFim && championship.dataFim !== championship.dataInicio && ` até ${formatDate(championship.dataFim)}`}
            </p>
            <p className="champ-location">
              <span role="img" aria-label="Localização">📍</span> Local: {championship.localEvento}
            </p>
            {/* O botão de inscrição agora usa a função handleInscricao */}
            <button onClick={handleInscricao} className="button button--inscricao-principal">
              Inscrever-se
            </button>
             {inscriptionStatus && <p className={`inscription-status ${inscriptionStatus.startsWith('Erro:') ? 'error' : 'success'}`}>{inscriptionStatus}</p>}
          </div>
        </div>
      </section>

      <nav className="champ-tabs-nav">
        <button
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Informações do Evento
        </button>
        <button
          className={`tab-button ${activeTab === 'local' ? 'active' : ''}`}
          onClick={() => setActiveTab('local')}
        >
          Local
        </button>
        <button
          className={`tab-button ${activeTab === 'categorias' ? 'active' : ''}`}
          onClick={() => setActiveTab('categorias')}
        >
          Categorias
        </button>
        <button
          className={`tab-button ${activeTab === 'inscritos' ? 'active' : ''}`}
          onClick={() => setActiveTab('inscritos')}
        >
          Inscritos
        </button>
        {/* Adicionar outras abas como Chaves, Resultados, etc. quando necessário */}
      </nav>

      <section className="champ-tab-content">
        {activeTab === 'info' && (
          <div className="tab-info-content">
            <div className="info-main-column">
              <h2>SOBRE O EVENTO</h2>
              <p>{championship.sobreEvento}</p>

              {/* Informações dinâmicas baseadas nos dados da API */}
              {championship.premiacoes && (
                <>
                  <h3>Premiações:</h3>
                  <p>{championship.premiacoes}</p>
                </>
              )}

              {(championship.idadeMinima || championship.idadeMaxima) && (
                <>
                  <h3>Faixa Etária:</h3>
                  <p>
                    {championship.idadeMinima && championship.idadeMaxima 
                      ? `${championship.idadeMinima} a ${championship.idadeMaxima} anos`
                      : championship.idadeMinima 
                        ? `A partir de ${championship.idadeMinima} anos`
                        : `Até ${championship.idadeMaxima} anos`
                    }
                  </p>
                </>
              )}

              {championship.maxInscritos && (
                <>
                  <h3>Vagas Disponíveis:</h3>
                  <p>Máximo de {championship.maxInscritos} atletas inscritos</p>
                </>
              )}

              {championship.taxaInscricao > 0 && (
                <>
                  <h3>Taxa de Inscrição:</h3>
                  <p>R$ {championship.taxaInscricao.toFixed(2)}</p>
                </>
              )}

              {championship.linkRegulamento && (
                <>
                  <h3>Regulamento:</h3>
                  <p>
                    <a 
                      href={championship.linkRegulamento} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="external-link"
                    >
                      Consulte o regulamento completo
                    </a>
                  </p>
                </>
              )}

              {/* Informações gerais sobre categorias - mantendo algumas informações estáticas úteis */}
              <h3>O evento contará com categorias para:</h3>
              <ul>
                <li>Diferentes faixas etárias e graduações</li>
                <li>Categorias masculina e feminina</li>
                <li>Divisões por peso</li>
                <li>Modalidades Gi e No-Gi (conforme regulamento)</li>
              </ul>

              <h3>Estrutura do Evento:</h3>
              <ul>
                <li>Árbitros credenciados por federações reconhecidas</li>
                <li>Cobertura fotográfica profissional</li>
                <li>Equipe médica à disposição</li>
                <li>Estrutura com praça de alimentação</li>
                <li>Área de aquecimento para atletas</li>
              </ul>
            </div>
            <aside className="info-sidebar-column">
              <h3>Informações do Campeonato</h3>
              <ul>
                <li><strong>Data de Início:</strong> {formatDateTime(championship.dataInicio)}</li>
                <li><strong>Data de Término:</strong> {formatDateTime(championship.dataFim)}</li>
                <li><strong>Local:</strong> {championship.localEvento}</li>
                <li><strong>Status:</strong> {getStatusText(championship.status)}</li>
                {championship.taxaInscricao > 0 && (
                  <li><strong>Taxa:</strong> R$ {championship.taxaInscricao.toFixed(2)}</li>
                )}
                {championship.maxInscritos && (
                  <li><strong>Máx. Inscritos:</strong> {championship.maxInscritos}</li>
                )}
              </ul>
              
              {championship.linkInscricao && (
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <a 
                    href={championship.linkInscricao} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    Link de Inscrição Externo
                  </a>
                </div>
              )}
            </aside>
          </div>
        )}
        {activeTab === 'local' && (
          <div className="tab-local-content">
            <h2>Local do Evento</h2>
            <p>{championship.localEvento}</p>
            {/* Adicionar mapa ou mais detalhes do local aqui */}
            <p><strong>Endereço:</strong> {championship.enderecoCompleto || "Endereço detalhado não fornecido."}</p>
            <p><em>(Conteúdo do Local em desenvolvimento)</em></p>
          </div>
        )}
        {activeTab === 'categorias' && (
          <div className="tab-categorias-content">
            <h2>Categorias</h2>
            {/* Idealmente, aqui você listaria as categorias específicas do campeonato,
                que podem vir de um endpoint como /Campeonato/{id}/categorias */}
            <p><em>(Conteúdo das Categorias em desenvolvimento. Aqui seriam listadas as categorias de peso, idade, faixa, etc.)</em></p>
          </div>
        )}

        {activeTab === 'inscritos' && (
          <div className="tab-inscritos-content">
            <h2>Atletas Inscritos</h2>
            {inscritosLoading && (
              <div className="loading-message">
                <p>Carregando lista de inscritos...</p>
              </div>
            )}
            {inscritosError && (
              <div className="error-message">
                <p>{inscritosError}</p>
              </div>
            )}
            {!inscritosLoading && !inscritosError && (
              <div className="inscritos-list">
                {inscritos.length === 0 ? (
                  <p className="no-inscritos">Nenhum atleta inscrito ainda.</p>
                ) : (
                  <>
                    <div className="inscritos-count">
                      <p><strong>Total de inscritos: {inscritos.length}</strong></p>
                    </div>
                    <div className="inscritos-lista">
                      <div className="lista-header">
                        <div className="header-item">Nome do Atleta</div>
                        <div className="header-item">Data de Inscrição</div>
                      </div>
                      {inscritos.map((inscrito, index) => (
                        <div key={inscrito.atletaId || index} className="inscrito-item">
                          <div className="inscrito-nome">
                            {inscrito.nomeAtleta || 'Nome não informado'}
                          </div>
                          <div className="inscrito-data">
                            {inscrito.dataInscricao 
                              ? new Date(inscrito.dataInscricao).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Data não informada'
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ChampionshipDetails;