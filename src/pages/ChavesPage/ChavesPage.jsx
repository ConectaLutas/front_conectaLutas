// src/pages/ChavesPage/ChavesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/api';
import './ChavesPage.css';

const ChavesPage = () => {
  const [campeonatos, setCampeonatos] = useState([]);
  const [selectedCampeonato, setSelectedCampeonato] = useState('');
  const [chaves, setChaves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário é administrador
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const tipoUsuario = decoded.tipoUsuario;
      
      if (tipoUsuario !== 'Administrador') {
        navigate('/');
        return;
      }
      
      setIsAdmin(true);
      loadCampeonatos();
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const loadCampeonatos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/Campeonato');
      setCampeonatos(response.data);
    } catch (err) {
      console.error('Erro ao carregar campeonatos:', err);
      setError('Erro ao carregar campeonatos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadChaves = async (campeonatoId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/api/Chave/${campeonatoId}/chaves`);
      setChaves(response.data);
    } catch (err) {
      console.error('Erro ao carregar chaves:', err);
      if (err.response?.status === 404) {
        setChaves([]);
        setError('Nenhuma chave encontrada para este campeonato.');
      } else {
        setError('Erro ao carregar chaves. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateChaves = async () => {
    if (!selectedCampeonato) {
      setError('Selecione um campeonato primeiro.');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      await api.post(`/api/Chave/${selectedCampeonato}/gerar-chave`);
      
      // Recarregar as chaves após gerar
      await loadChaves(selectedCampeonato);
      
      setError(null);
    } catch (err) {
      console.error('Erro ao gerar chaves:', err);
      setError(err.response?.data?.message || 'Erro ao gerar chaves. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCampeonatoChange = (e) => {
    const campeonatoId = e.target.value;
    setSelectedCampeonato(campeonatoId);
    setChaves([]);
    setError(null);
    
    if (campeonatoId) {
      loadChaves(campeonatoId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  const renderChaveTree = (chaves) => {
    if (!chaves || chaves.length === 0) {
      return <div className="no-chaves">Nenhuma chave disponível</div>;
    }

    // Organizar chaves por rodada
    const chavesPorRodada = chaves.reduce((acc, chave) => {
      const rodada = chave.rodada || 1;
      if (!acc[rodada]) acc[rodada] = [];
      acc[rodada].push(chave);
      return acc;
    }, {});

    return (
      <div className="chaves-tree">
        {Object.keys(chavesPorRodada)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(rodada => (
            <div key={rodada} className="rodada">
              <h3>Rodada {rodada}</h3>
              <div className="chaves-rodada">
                {chavesPorRodada[rodada].map(chave => (
                  <div key={chave.id} className="chave-item">
                    <div className="chave-header">
                      <span className="chave-numero">Chave #{chave.numero || chave.id}</span>
                      {chave.categoria && (
                        <span className="chave-categoria">{chave.categoria}</span>
                      )}
                    </div>
                    <div className="chave-participantes">
                      <div className="participante">
                        <span className="nome">{chave.atleta1?.nome || 'Atleta 1'}</span>
                        {chave.resultado && (
                          <span className="resultado">{chave.resultado.pontuacaoAtleta1 || 0}</span>
                        )}
                      </div>
                      <div className="vs">VS</div>
                      <div className="participante">
                        <span className="nome">{chave.atleta2?.nome || 'Atleta 2'}</span>
                        {chave.resultado && (
                          <span className="resultado">{chave.resultado.pontuacaoAtleta2 || 0}</span>
                        )}
                      </div>
                    </div>
                    {chave.vencedor && (
                      <div className="vencedor">
                        Vencedor: {chave.vencedor.nome}
                      </div>
                    )}
                    <div className="chave-status">
                      Status: {chave.status || 'Pendente'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    );
  };

  if (!isAdmin) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="chaves-page">
      <div className="chaves-container">
        <h2>Gerenciamento de Chaves</h2>
        
        <div className="chaves-controls">
          <div className="form-group">
            <label htmlFor="campeonato-select">Selecionar Campeonato:</label>
            <select
              id="campeonato-select"
              value={selectedCampeonato}
              onChange={handleCampeonatoChange}
              disabled={isLoading}
              className="campeonato-select"
            >
              <option value="">Selecione um campeonato...</option>
              {campeonatos.map(campeonato => (
                <option key={campeonato.id} value={campeonato.id}>
                  {campeonato.nome} - {formatDate(campeonato.dataInicio)}
                </option>
              ))}
            </select>
          </div>

          {selectedCampeonato && (
            <button
              onClick={generateChaves}
              disabled={isGenerating || isLoading}
              className="button button--generate-chaves"
            >
              {isGenerating ? 'Gerando Chaves...' : 'Gerar Chaves'}
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-message">
            Carregando...
          </div>
        )}

        {selectedCampeonato && !isLoading && (
          <div className="chaves-content">
            <h3>Chaves do Campeonato</h3>
            {renderChaveTree(chaves)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChavesPage;

