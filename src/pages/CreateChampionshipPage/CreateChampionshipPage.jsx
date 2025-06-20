// src/pages/CreateChampionshipPage/CreateChampionshipPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/api';
import './CreateChampionshipPage.css';

const CreateChampionshipPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    dataInicio: '',
    dataFim: '',
    sobreEvento: '',
    localEvento: '',
    taxaInscricao: '',
    premiacoes: '',
    maxInscritos: '',
    idadeMinima: '',
    idadeMaxima: '',
    linkRegulamento: '',
    linkInscricao: '',
    foto: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
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
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];

    // Validações obrigatórias
    if (!formData.nome.trim()) errors.nome = "Nome do campeonato é obrigatório.";
    if (!formData.dataInicio) errors.dataInicio = "Data de início é obrigatória.";
    if (!formData.dataFim) errors.dataFim = "Data de fim é obrigatória.";
    if (!formData.sobreEvento.trim()) errors.sobreEvento = "Descrição do evento é obrigatória.";
    if (!formData.localEvento.trim()) errors.localEvento = "Local do evento é obrigatório.";

    // Validação de datas
    if (formData.dataInicio && formData.dataInicio < today) {
      errors.dataInicio = "Data de início não pode ser menor que hoje.";
    }
    
    if (formData.dataInicio && formData.dataFim && formData.dataFim < formData.dataInicio) {
      errors.dataFim = "Data de fim não pode ser menor que a data de início.";
    }

    // Validações numéricas
    if (formData.taxaInscricao && isNaN(parseFloat(formData.taxaInscricao))) {
      errors.taxaInscricao = "Taxa de inscrição deve ser um número válido.";
    }
    
    if (formData.maxInscritos && (!Number.isInteger(Number(formData.maxInscritos)) || Number(formData.maxInscritos) <= 0)) {
      errors.maxInscritos = "Máximo de inscritos deve ser um número inteiro positivo.";
    }
    
    if (formData.idadeMinima && (!Number.isInteger(Number(formData.idadeMinima)) || Number(formData.idadeMinima) < 0)) {
      errors.idadeMinima = "Idade mínima deve ser um número inteiro não negativo.";
    }
    
    if (formData.idadeMaxima && (!Number.isInteger(Number(formData.idadeMaxima)) || Number(formData.idadeMaxima) < 0)) {
      errors.idadeMaxima = "Idade máxima deve ser um número inteiro não negativo.";
    }
    
    if (formData.idadeMinima && formData.idadeMaxima && Number(formData.idadeMaxima) < Number(formData.idadeMinima)) {
      errors.idadeMaxima = "Idade máxima não pode ser menor que a idade mínima.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      foto: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Adicionar todos os campos do formulário
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          if (key === 'foto' && formData[key]) {
            formDataToSend.append(key, formData[key]);
          } else if (key !== 'foto') {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await api.post('/Campeonato', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirecionar para a página do campeonato criado
      navigate(`/campeonato/${response.data.id}`);
    } catch (err) {
      console.error('Erro ao criar campeonato:', err);
      setError(err.response?.data?.message || 'Erro ao criar campeonato. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="create-championship-page">
      <div className="create-championship-container">
        <h2>Criar Novo Campeonato</h2>
        
        <form onSubmit={handleSubmit} className="championship-form" encType="multipart/form-data">
          {error && <div className="form-error-api">{error}</div>}

          <div className="form-group">
            <label htmlFor="nome">Nome do Campeonato *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome do campeonato"
              className={fieldErrors.nome ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.nome && <span className="error-msg">{fieldErrors.nome}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataInicio">Data de Início *</label>
              <input
                type="datetime-local"
                id="dataInicio"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleInputChange}
                className={fieldErrors.dataInicio ? 'input-error' : ''}
                disabled={isLoading}
              />
              {fieldErrors.dataInicio && <span className="error-msg">{fieldErrors.dataInicio}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dataFim">Data de Fim *</label>
              <input
                type="datetime-local"
                id="dataFim"
                name="dataFim"
                value={formData.dataFim}
                onChange={handleInputChange}
                className={fieldErrors.dataFim ? 'input-error' : ''}
                disabled={isLoading}
              />
              {fieldErrors.dataFim && <span className="error-msg">{fieldErrors.dataFim}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="sobreEvento">Sobre o Evento *</label>
            <textarea
              id="sobreEvento"
              name="sobreEvento"
              value={formData.sobreEvento}
              onChange={handleInputChange}
              placeholder="Descreva detalhadamente o evento..."
              rows="5"
              className={fieldErrors.sobreEvento ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.sobreEvento && <span className="error-msg">{fieldErrors.sobreEvento}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="localEvento">Local do Evento *</label>
            <input
              type="text"
              id="localEvento"
              name="localEvento"
              value={formData.localEvento}
              onChange={handleInputChange}
              placeholder="Digite o local do evento"
              className={fieldErrors.localEvento ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.localEvento && <span className="error-msg">{fieldErrors.localEvento}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="taxaInscricao">Taxa de Inscrição (R$)</label>
            <input
              type="number"
              step="0.01"
              id="taxaInscricao"
              name="taxaInscricao"
              value={formData.taxaInscricao}
              onChange={handleInputChange}
              placeholder="0.00"
              className={fieldErrors.taxaInscricao ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.taxaInscricao && <span className="error-msg">{fieldErrors.taxaInscricao}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="premiacoes">Premiações</label>
            <textarea
              id="premiacoes"
              name="premiacoes"
              value={formData.premiacoes}
              onChange={handleInputChange}
              placeholder="Descreva as premiações do evento..."
              rows="4"
              className={fieldErrors.premiacoes ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.premiacoes && <span className="error-msg">{fieldErrors.premiacoes}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxInscritos">Máximo de Inscritos</label>
              <input
                type="number"
                id="maxInscritos"
                name="maxInscritos"
                value={formData.maxInscritos}
                onChange={handleInputChange}
                placeholder="Ex: 100"
                className={fieldErrors.maxInscritos ? 'input-error' : ''}
                disabled={isLoading}
              />
              {fieldErrors.maxInscritos && <span className="error-msg">{fieldErrors.maxInscritos}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="idadeMinima">Idade Mínima</label>
              <input
                type="number"
                id="idadeMinima"
                name="idadeMinima"
                value={formData.idadeMinima}
                onChange={handleInputChange}
                placeholder="Ex: 16"
                className={fieldErrors.idadeMinima ? 'input-error' : ''}
                disabled={isLoading}
              />
              {fieldErrors.idadeMinima && <span className="error-msg">{fieldErrors.idadeMinima}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="idadeMaxima">Idade Máxima</label>
              <input
                type="number"
                id="idadeMaxima"
                name="idadeMaxima"
                value={formData.idadeMaxima}
                onChange={handleInputChange}
                placeholder="Ex: 65"
                className={fieldErrors.idadeMaxima ? 'input-error' : ''}
                disabled={isLoading}
              />
              {fieldErrors.idadeMaxima && <span className="error-msg">{fieldErrors.idadeMaxima}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="linkRegulamento">Link do Regulamento</label>
            <input
              type="url"
              id="linkRegulamento"
              name="linkRegulamento"
              value={formData.linkRegulamento}
              onChange={handleInputChange}
              placeholder="https://exemplo.com/regulamento"
              className={fieldErrors.linkRegulamento ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.linkRegulamento && <span className="error-msg">{fieldErrors.linkRegulamento}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="linkInscricao">Link de Inscrição Externa</label>
            <input
              type="url"
              id="linkInscricao"
              name="linkInscricao"
              value={formData.linkInscricao}
              onChange={handleInputChange}
              placeholder="https://exemplo.com/inscricao"
              className={fieldErrors.linkInscricao ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.linkInscricao && <span className="error-msg">{fieldErrors.linkInscricao}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto do Evento</label>
            <input
              type="file"
              id="foto"
              name="foto"
              onChange={handleFileChange}
              accept="image/*"
              className={fieldErrors.foto ? 'input-error' : ''}
              disabled={isLoading}
            />
            {fieldErrors.foto && <span className="error-msg">{fieldErrors.foto}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="button button--secondary"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="button button--primary"
              disabled={isLoading}
            >
              {isLoading ? 'Criando...' : 'Criar Campeonato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChampionshipPage;

