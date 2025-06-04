// src/pages/EditProfilePage/EditProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    dataNascimento: '',
    sexo: '',
    graduacaoId: '',
    peso: '',
    esporteId: '',
    academiaId: '',
    professorId: '',
    // Adicione outros campos que podem ser editados se a API permitir
  });
  const [atletaId, setAtletaId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Estados para os selects (similar ao RegisterPage)
  const [esportes, setEsportes] = useState([]);
  const [graduacoes, setGraduacoes] = useState([]);
  const [academias, setAcademias] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const token = localStorage.getItem('authToken');
      const currentAtletaId = localStorage.getItem('loggedInAtletaId');

      if (!token || !currentAtletaId) {
        navigate('/login');
        return;
      }
      setAtletaId(currentAtletaId);
      setIsLoading(true);
      setError(null);

      try {
        // Carregar dados do atleta para preencher o formulário
        const atletaRes = await api.get(`/api/Atleta/${currentAtletaId}`);
        const atletaData = atletaRes.data;

        // Carregar listas para os selects
        const [esporteRes, graduacaoRes, academiaRes, professorRes] = await Promise.all([
          api.get('/api/Esporte'),
          api.get('/api/Graduacao'),
          api.get('/api/Academia'),
          api.get('/api/Professor')
        ]);
        setEsportes(esporteRes.data);
        setGraduacoes(graduacaoRes.data);
        setAcademias(academiaRes.data);
        setProfessores(professorRes.data);

        setFormData({
          nomeCompleto: atletaData.usuario?.nomeCompleto || '',
          email: atletaData.usuario?.email || '',
          // Formatar data para o input type="date" (YYYY-MM-DD)
          dataNascimento: atletaData.usuario?.dataNascimento ? atletaData.usuario.dataNascimento.split('T')[0] : '',
          sexo: atletaData.sexo?.toString() || '',
          graduacaoId: atletaData.graduacaoId?.toString() || '',
          peso: atletaData.peso?.toString() || '',
          esporteId: atletaData.esporteId?.toString() || '',
          academiaId: atletaData.academiaId?.toString() || '',
          professorId: atletaData.professorId?.toString() || '',
        });

      } catch (err) {
        console.error("Erro ao carregar dados para edição:", err);
        setError(err.response?.data?.message || "Falha ao carregar dados do perfil.");
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage('');

    // Aqui você precisará do endpoint PUT e do DTO de atualização correto
    // Exemplo: PUT /api/Atleta/{atletaId}
    // O payload pode ser similar ao formData, mas adaptado ao que a API espera
    const dataToUpdate = {
      ...formData,
      // Converter IDs e peso para os tipos corretos se necessário
      sexo: parseInt(formData.sexo, 10),
      graduacaoId: parseInt(formData.graduacaoId, 10),
      peso: parseFloat(formData.peso),
      esporteId: parseInt(formData.esporteId, 10),
      academiaId: formData.academiaId ? parseInt(formData.academiaId, 10) : null,
      professorId: formData.professorId ? parseInt(formData.professorId, 10) : null,
      dataNascimento: `${formData.dataNascimento}T00:00:00` // Adicionar hora se a API esperar DateTime completo
    };
    
    // Remover campos que não devem ser enviados ou que não mudaram, se a API for PATCH
    // delete dataToUpdate.email; // Exemplo: se email não for editável aqui

    try {
      // !! SUBSTITUA PELO SEU ENDPOINT E LÓGICA DE ATUALIZAÇÃO REAIS !!
      // const response = await api.put(`/api/Atleta/${atletaId}`, dataToUpdate);
      // if (response.status === 200 || response.status === 204) {

      // Simulação de sucesso por enquanto:
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula chamada API
      console.log("Dados enviados para atualização (simulado):", dataToUpdate);
      setSuccessMessage('Perfil atualizado com sucesso!');
      // Opcional: recarregar dados ou atualizar estado local se a API não retornar o objeto atualizado
      // Opcional: limpar mensagem de sucesso após alguns segundos
      // } else {
      //   throw new Error(response.data?.message || "Falha ao atualizar perfil.");
      // }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(err.response?.data?.message || err.message || "Ocorreu um erro ao salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="edit-profile-page"><ProfileSidebar /><p className="loading-message">Carregando dados para edição...</p></div>;

  return (
    <div className="edit-profile-page">
      <ProfileSidebar />
      <main className="edit-profile-content">
        <h2>Editar Perfil</h2>
        {error && <p className="form-error-api">{error}</p>}
        {successMessage && <p className="form-success">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {/* Nota: Mudar e-mail geralmente requer um fluxo de verificação. */}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="peso">Peso (kg)</label>
              <input type="number" step="0.1" id="peso" name="peso" value={formData.peso} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sexo">Sexo</label>
              <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="1">Masculino</option>
                <option value="2">Feminino</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="graduacaoId">Graduação</label>
              <select id="graduacaoId" name="graduacaoId" value={formData.graduacaoId} onChange={handleChange}>
                <option value="">Selecione</option>
                {graduacoes.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="esporteId">Esporte</label>
            <select id="esporteId" name="esporteId" value={formData.esporteId} onChange={handleChange}>
              <option value="">Selecione</option>
              {esportes.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="academiaId">Academia (opcional)</label>
              <select id="academiaId" name="academiaId" value={formData.academiaId} onChange={handleChange}>
                <option value="">Selecione</option>
                {academias.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="professorId">Professor (opcional)</label>
              <select id="professorId" name="professorId" value={formData.professorId} onChange={handleChange}>
                <option value="">Selecione</option>
                {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
          </div>
          
          {/* Adicionar campos para "Alterar Senha" aqui se desejar,
              mas idealmente isso seria um formulário/fluxo separado */}

          <button type="submit" className="button button--save-profile" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditProfilePage;