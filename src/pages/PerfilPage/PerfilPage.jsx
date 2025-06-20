// src/pages/PerfilPage/PerfilPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import api from '../../api/api'; // Usando a instância configurada do Axios
import './PerfilPage.css';

const PerfilPage = () => {
  const { id: atletaIdFromParams } = useParams();
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para mensagens de erro
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchPerfil = async (id) => {
      setLoading(true);
      setError(null);
      try {
        // Chamada real à API
        const response = await api.get(`/api/Atleta/${id}`);
        const dadosApi = response.data;

        // Mapeando os dados da API para o estado 'atleta'
        setAtleta({
          id: dadosApi.id,
          nomeCompleto: dadosApi.usuario?.nomeCompleto,
          email: dadosApi.usuario?.email,
          dataNascimento: dadosApi.usuario?.dataNascimento,
          peso: dadosApi.peso,
          sexo: dadosApi.sexo,
          graduacaoNome: dadosApi.graduacao?.nome,
          esporteNome: dadosApi.esporte?.nome,
          academiaNome: dadosApi.academia?.nome, // Usado para "Equipe"

          // --- Campos que AINDA PRECISAM de confirmação/dados da API ou serão simulados ---
          fotoUrl: dadosApi.usuario?.fotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(dadosApi.usuario?.nomeCompleto || 'Atleta')}&background=0D3B66&color=fff&size=100`, // Usar ui-avatars se fotoUrl não vier
          
          localizacao: dadosApi.usuario?.localizacao || "Brasil", // CAMPO PENDENTE NA API (simulado)
          
          // "Modalidade" virá de esporteNome
          // "Faixa e Peso" será formatado no JSX
          // "Equipe" virá de academiaNome

          participacoesCampeonatos: dadosApi.inscricoes?.length || 0, // Usando o tamanho do array 'inscricoes'
                                                                      // CONFIRMAR se 'inscricoes' sempre vem e se é a contagem correta.

          estatisticas: dadosApi.estatisticas || { // CAMPO PENDENTE NA API (simulado)
            primeiroLugar: Math.floor(Math.random() * 0) + 0, // Simulação aleatória
            segundoLugar: Math.floor(Math.random() * 0) + 0,  // Simulação aleatória
            terceiroLugar: Math.floor(Math.random() * 0) + 0,   // Simulação aleatória
          },

          // Processar 'inscricoes' para 'Últimos Eventos'
          // CONFIRMAR estrutura do objeto 'campeonato' dentro de 'inscricoes'
          ultimosEventos: dadosApi.inscricoes?.slice(0, 3).map(insc => ({
            id: insc.campeonato?.id || insc.campeonatoId || insc.id, // Priorizar IDs
            nome: insc.campeonato?.nome || "Evento Desconhecido",
            // A data do evento provavelmente estará em insc.campeonato.dataInicio ou similar
            data: insc.campeonato?.dataInicio ? new Date(insc.campeonato.dataInicio).toLocaleDateString() : (insc.dataInscricao ? new Date(insc.dataInscricao).toLocaleDateString() : "Data Indisponível")
          })) || [], // Se 'inscricoes' não vier ou for vazio, retorna array vazio
        });

      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        let errorMessage = 'Falha ao carregar perfil. Tente novamente.';
        if (err.response) {
          if (err.response.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('loggedInAtletaId');
            navigate('/login');
            return; // Evita setar erro se já está redirecionando
          }
          errorMessage = err.response.data?.message || err.response.data?.title || errorMessage;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const idParaBuscar = atletaIdFromParams;

    if (idParaBuscar) {
      if (!token) {
        setError("Autenticação necessária.");
        setLoading(false);
        navigate('/login');
        return;
      }
      fetchPerfil(idParaBuscar);
    } else {
      setError("ID do atleta não fornecido na URL.");
      setLoading(false);
      // Idealmente, se esta página SÓ deve ser acessada com um ID,
      // talvez redirecionar ou mostrar uma mensagem mais específica.
      // Se houver uma rota "/meu-perfil" sem ID, a lógica para obter o ID do logado seria aqui.
    }

  }, [atletaIdFromParams, token, navigate]);


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInAtletaId');
    navigate('/login');
  };

  const calcularIdade = (dataNasc) => {
    if (!dataNasc) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade >= 0 ? idade : null; // Evitar idade negativa se dataNascimento for futura
  };

  if (loading) return <p className="perfil-loading">Carregando perfil...</p>;
  if (error) return <p className="perfil-error">{error}</p>;
  if (!atleta) return <p className="perfil-error">Perfil não encontrado.</p>;

  const idadeCalculada = calcularIdade(atleta.dataNascimento);
  const faixaPesoFormatado = `${atleta.graduacaoNome || 'Não informada'} ${atleta.peso ? `- ${atleta.peso.toFixed(1)} kg` : ''}`;
  const sexoFormatado = atleta.sexo === 1 ? 'Masculino' : atleta.sexo === 2 ? 'Feminino' : 'Não informado';
  const modalidadeFormatada = atleta.esporteNome || 'Não informado';
  const equipeFormatada = atleta.academiaNome || 'Não informada';

  return (
    <div className="perfil-page-container">
      <ProfileSidebar />
      <main className="perfil-main-content">
        <div className="perfil-info-header">
          <img
            src={atleta.fotoUrl} // Vem do mapeamento (pode ser ui-avatars)
            alt={`Foto de ${atleta.nomeCompleto}`}
            className="perfil-avatar"
          />
          <div className="perfil-header-text">
            <h1>{atleta.nomeCompleto || 'Nome não disponível'}</h1>
            {idadeCalculada !== null && <p className="perfil-idade">{idadeCalculada} anos</p>}
          </div>
        </div>

        <div className="perfil-details-grid">
          <div className="perfil-detail-item">
            <strong>Modalidade:</strong>
            <p>{modalidadeFormatada}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Localização:</strong>
            <p>{atleta.localizacao}</p> {/* Ainda simulado/pendente da API */}
          </div>
          <div className="perfil-detail-item">
            <strong>Faixa / Peso:</strong>
            <p>{faixaPesoFormatado}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Equipe:</strong>
            <p>{equipeFormatada}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Email:</strong>
            <p>{atleta.email || 'Não informado'}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Sexo:</strong>
            <p>{sexoFormatado}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Participações:</strong>
            <p>{atleta.participacoesCampeonatos} campeonatos</p>
          </div>
        </div>

        <section className="perfil-stats-section">
          <h3>Estatísticas em Campeonatos</h3>
          <div className="stat-item">
            <span className="stat-label">1º Lugar</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar"
                style={{ width: `${atleta.estatisticas.primeiroLugar}%` }}
              ></div>
            </div>
            <span className="stat-value">{atleta.estatisticas.primeiroLugar}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">2º Lugar</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar stat-bar--second"
                style={{ width: `${atleta.estatisticas.segundoLugar}%` }}
              ></div>
            </div>
            <span className="stat-value">{atleta.estatisticas.segundoLugar}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">3º Lugar</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar stat-bar--third"
                style={{ width: `${atleta.estatisticas.terceiroLugar}%` }}
              ></div>
            </div>
            <span className="stat-value">{atleta.estatisticas.terceiroLugar}%</span>
          </div>
        </section>
      </main>

      <aside className="perfil-right-sidebar">
        <div className="recent-events">
          <div className="recent-events-header">
            🏆
            <h4>Últimos eventos que participei</h4>
          </div>
          {atleta.ultimosEventos && atleta.ultimosEventos.length > 0 ? (
            <ul>
              {atleta.ultimosEventos.map(evento => (
                <li key={evento.id}>
                  <span className="event-name">{evento.nome}</span>
                  <span className="event-date">{evento.data}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum evento recente.</p>
          )}
        </div>
        <button onClick={handleLogout} className="button-logout">
          Sair
        </button>
      </aside>
    </div>
  );
};

export default PerfilPage;