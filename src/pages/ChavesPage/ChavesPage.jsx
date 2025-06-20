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
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
      const token = localStorage.getItem('authToken');
      const response = await api.get('/Campeonato', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const token = localStorage.getItem('authToken');
      const response = await api.get(`/api/Chave/${campeonatoId}/chaves`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChaves(response.data.chaves || []);
    } catch (err) {
      console.error('Erro ao carregar chaves:', err);
      setChaves([]);
      setError('Erro ao carregar chaves. Tente novamente.');
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
      setSuccessMessage('');
      const token = localStorage.getItem('authToken');

      const response = await api.post(
        `/api/Chave/${selectedCampeonato}/gerar-chave`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Chave gerada com sucesso!');
        await loadChaves(selectedCampeonato);
      }
    } catch (err) {
      console.error('Erro ao gerar chaves:', err);
      setError(err.response?.data?.message || 'Erro ao gerar chaves. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const baixarPdf = async (campeonatoId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await api.get(`/api/Chave/${campeonatoId}/chaves/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `chaves_campeonato_${campeonatoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      setError('Erro ao baixar PDF das chaves.');
    }
  };

  const handleCampeonatoChange = async (e) => {
    const campeonatoId = e.target.value;
    setSelectedCampeonato(campeonatoId);
    setChaves([]);
    setError(null);
    setSuccessMessage('');
    if (campeonatoId) {
      await loadChaves(campeonatoId);
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

    return (
      <div className="chaves-visual">
        {chaves.map((chave, index) => (
          <div key={index} className="chave-categoria-bloco">
            <h4 className="chave-titulo">{chave.nome}</h4>
            {(chave.lutas || []).map((luta, i) => (
              <div key={i} className="luta-bloco">
                <div className="atleta-lado">
                  <span className="atleta-nome">{luta.nomeAtleta1 || luta.atleta1Id || '---'}</span>
                </div>
                <div className="versus">vs</div>
                <div className="atleta-lado">
                  <span className="atleta-nome">{luta.nomeAtleta2 || luta.atleta2Id || '---'}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  if (!isAdmin) return <div>Carregando...</div>;

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
              {campeonatos.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome} - {formatDate(c.dataInicio)}
                </option>
              ))}
            </select>
          </div>

          {selectedCampeonato && (
            <div className="button-group">
              <button
                onClick={generateChaves}
                disabled={isGenerating || isLoading}
                className="button--generate-chaves"
              >
                {isGenerating ? 'Gerando Chaves...' : 'Gerar Nova Chave'}
              </button>

              {chaves.length > 0 && (
                <button
                  className="button--generate-chaves"
                  style={{ backgroundColor: '#007bff' }}
                  onClick={() => baixarPdf(selectedCampeonato)}
                >
                  Baixar PDF das Chaves
                </button>
              )}
            </div>
          )}
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        {isLoading && <div className="loading-message">Carregando...</div>}

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
