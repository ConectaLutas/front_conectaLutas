// src/pages/PerfilPage/PerfilPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar'; // Importar
import './PerfilPage.css'; // Seu CSS atualizado
// import api from '../../api/api'; // Descomente se for usar a chamada API real

const PerfilPage = () => {
  const { id } = useParams(); // O 'id' do atleta da URL
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchPerfil = async () => {
      setLoading(true);
      try {
        // Simulação de dados por enquanto, baseado no Figma
        // TODO: Substituir pela chamada API real e ajustar os dados
        const mockAtletaData = {
          id: id, // Usar o ID da URL para consistência
          nomeCompleto: "Kayque Milhome",
          idade: 27, // Adicionar
          email: "kayque.milhome@example.com",
          modalidade: "Atleta de Jiu-Jitsu", // Adicionar
          localizacao: "São Paulo - SP, Brasil", // Adicionar
          faixaPeso: "Preta + 75 kg", // Adicionar
          equipe: "TEAM REIS", // Adicionar
          participacoesCampeonatos: 3, // Adicionar
          // Data de nascimento pode ser usada para calcular a idade se a API não fornecer a idade diretamente
          dataNascimento: "1997-05-15",
          peso: 78.5,
          estatisticas: { // Adicionar
            primeiroLugar: 67, // %
            segundoLugar: 40, // % (esses valores do Figma parecem estranhos, talvez sejam nº de vitórias)
            terceiroLugar: 20,  // %
          },
          ultimosEventos: [ // Adicionar
            { id: 1, nome: "Torneio Paulista de Jiu-Jitsu", data: "05/04/2025" }
          ]
        };

        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Se fosse uma chamada real:
        // const response = await api.get(`/api/Atleta/${id}`);
        // if (response.status === 401) {
        //   localStorage.removeItem('authToken');
        //   navigate('/login');
        //   return;
        // }
        // if (!response.ok) throw new Error('Erro ao buscar perfil');
        // const data = await response.json();
        // setAtleta(data); // Use os dados da API

        setAtleta(mockAtletaData); // Usando dados mockados

      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
        // Tratar outros erros, talvez definir um estado de erro para exibir na UI
      } finally {
        setLoading(false);
      }
    };

    if (id && token) { // Garante que temos ID e token (ou ajuste conforme sua lógica de autenticação)
      fetchPerfil();
    } else if (!token) {
      navigate('/login'); // Redireciona se não houver token
    }
  }, [id, token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // localStorage.removeItem('atletaData'); // Limpar o cache do atleta se estiver usando
    navigate('/login');
  };

  if (loading) return <p className="perfil-loading">Carregando perfil...</p>;
  if (!atleta) return <p className="perfil-error">Perfil não encontrado ou não autorizado.</p>;

  // Função para calcular a idade (se a API não fornecer)
  const calcularIdade = (dataNasc) => {
    if (!dataNasc) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };
  // Se a API já trouxer a idade, use atleta.idade diretamente
  const idadeCalculada = atleta.idade || calcularIdade(atleta.dataNascimento);


  return (
    <div className="perfil-page-container"> {/* Novo container geral da página */}
      <ProfileSidebar />
      <main className="perfil-main-content">
        <div className="perfil-info-header">
          <img
            src={atleta.fotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(atleta.nomeCompleto)}&background=0D3B66&color=fff&size=100`}
            alt={`Foto de ${atleta.nomeCompleto}`}
            className="perfil-avatar"
          />
          <div className="perfil-header-text">
            <h1>{atleta.nomeCompleto}</h1>
            {idadeCalculada && <p className="perfil-idade">{idadeCalculada} anos</p>}
          </div>
        </div>

        <div className="perfil-details-grid">
          <div className="perfil-detail-item">
            <strong>Modalidade:</strong>
            <p>{atleta.modalidade || 'Jiu-Jitsu'}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Localização:</strong>
            <p>{atleta.localizacao || 'Não informada'}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Faixa / Peso:</strong>
            <p>{atleta.faixaPeso || 'Não informado'}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Equipe:</strong>
            <p>{atleta.equipe || 'Não informada'}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Email:</strong>
            <p>{atleta.email}</p>
          </div>
          <div className="perfil-detail-item">
            <strong>Peso Registrado:</strong>
            <p>{atleta.peso} kg</p>
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
                style={{ width: `${atleta.estatisticas?.primeiroLugar || 0}%` }}
              ></div>
            </div>
            <span className="stat-value">{atleta.estatisticas?.primeiroLugar || 0}%</span>
          </div>
          {/* Repetir para 2º e 3º lugar */}
          <div className="stat-item">
            <span className="stat-label">2º Lugar</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar stat-bar--second"
                style={{ width: `${atleta.estatisticas?.segundoLugar || 0}%` }}
              ></div>
            </div>
            <span className="stat-value">{atleta.estatisticas?.segundoLugar || 0}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">3º Lugar</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar stat-bar--third"
                style={{ width: `${atleta.estatisticas?.terceiroLugar || 0}%` }}
              ></div>
            </div>
            <span className="stat-value">{atleta.estatisticas?.terceiroLugar || 0}%</span>
          </div>
        </section>
      </main>

      <aside className="perfil-right-sidebar">
        <div className="recent-events">
          <div className="recent-events-header">
            {/* Ícone de troféu aqui (ex: <FaTrophy />) */}
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