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


  if (isLoading) return <p className="loading-message">Carregando detalhes do campeonato...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!championship) return <p className="empty-message">Campeonato não encontrado.</p>;

  // Textos placeholder para as listas que não vêm da API diretamente
  const categoriasParticipantes = [
    "Crianças, Juvenis e Adultos",
    "Masters",
    "Faixas Branca até Preta",
    "Masculino e Feminino",
    "Modalidades Gi e No-Gi"
  ];
  const objetivoEvento = "Promover o Jiu-Jitsu regional, estimular o desenvolvimento técnico dos atletas e criar laços entre equipes de diferentes estados.";
  const confirmacoesEvento = [
    "Academias renomadas do Norte e Nordeste",
    "Árbitros credenciados por federações reconhecidas",
    "Premiação especial para a categoria Absoluto",
    "Cobertura fotográfica profissional no local",
    "Ambulância e equipe médica à disposição",
    "Estrutura com praça de alimentação e área de convivência"
  ];
  // Placeholder para Datas Importantes (ajustar quando a API fornecer)
  const datasImportantes = {
    inscricoes: `De ${formatDate(championship.dataInicioInscricao) || 'DD/MM/AAAA'} até ${formatDate(championship.dataFimInscricao) || 'DD/MM/AAAA'}`,
    pagamento: `Até ${formatDate(championship.dataLimitePagamento) || 'DD/MM/AAAA'}`,
    divulgacaoChaves: `${formatDate(championship.dataDivulgacaoChaves) || 'DD/MM'}`,
    inicioCompeticao: `${formatDateTime(championship.dataInicio) || 'DD/MM/AAAA às HH:mm'}`
  };


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
        {/* Adicionar outras abas como Chaves, Resultados, etc. quando necessário */}
      </nav>

      <section className="champ-tab-content">
        {activeTab === 'info' && (
          <div className="tab-info-content">
            <div className="info-main-column">
              <h2>SOBRE O EVENTO</h2>
              <p>{championship.sobreEvento}</p>

              <h3>O evento contará com categorias para:</h3>
              <ul>
                {categoriasParticipantes.map((item, index) => <li key={index}>{item}</li>)}
              </ul>

              <h3>Objetivo:</h3>
              <p>{objetivoEvento}</p>
              
              <h3>Confirmado no evento:</h3>
              <ul>
                {confirmacoesEvento.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              
              {championship.taxaInscricao && <p><strong>Taxa de Inscrição:</strong> R$ {championship.taxaInscricao.toFixed(2)}</p>}
              {championship.premiacoes && <p><strong>Premiações:</strong> {championship.premiacoes}</p>}
              {(championship.idadeMinima && championship.idadeMaxima) && <p><strong>Idade Permitida:</strong> {championship.idadeMinima} - {championship.idadeMaxima} anos</p>}
              {championship.maxInscritos && <p><strong>Máximo de Inscritos:</strong> {championship.maxInscritos}</p>}
              {championship.linkRegulamento && <p><a href={championship.linkRegulamento} target="_blank" rel="noopener noreferrer" className="external-link">Regulamento Completo</a></p>}
              {/* O link de inscrição original pode ser removido se o botão interno for o principal */}
              {/* {championship.linkInscricao && <p><a href={championship.linkInscricao} target="_blank" rel="noopener noreferrer">Link de Inscrição Externo</a></p>} */}
            </div>
            <aside className="info-sidebar-column">
              <h3>Datas importantes</h3>
              <ul>
                <li><strong>Inscrições:</strong> {datasImportantes.inscricoes}</li>
                <li><strong>Pagamento:</strong> {datasImportantes.pagamento}</li>
                <li><strong>Divulgação das Chaves:</strong> {datasImportantes.divulgacaoChaves}</li>
                <li><strong>Início da Competição:</strong> {datasImportantes.inicioCompeticao}</li>
              </ul>
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
      </section>
    </div>
  );
};

export default ChampionshipDetails;