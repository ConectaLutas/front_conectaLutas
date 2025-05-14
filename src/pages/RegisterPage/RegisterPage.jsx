import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [sexo, setSexo] = useState('');
  const [graduacaoId, setGraduacaoId] = useState('');
  const [peso, setPeso] = useState('');
  const [esporteId, setEsporteId] = useState('');
  const [academiaId, setAcademiaId] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [esportes, setEsportes] = useState([]);
  const [graduacoes, setGraduacoes] = useState([]);
  const [academias, setAcademias] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar listas. Tente novamente mais tarde.');
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Nome completo é obrigatório.";
    if (!email.trim()) errors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Formato de email inválido.";
    if (!password) errors.password = "Senha é obrigatória.";
    else if (password.length < 6) errors.password = "Senha deve ter pelo menos 6 caracteres.";
    if (password !== confirmPassword) errors.confirmPassword = "As senhas não coincidem.";
    if (!dataNascimento) errors.dataNascimento = "Data de nascimento é obrigatória.";
    if (!cpf.trim()) errors.cpf = "CPF é obrigatório.";
    if (!sexo) errors.sexo = "Sexo é obrigatório.";
    if (!graduacaoId) errors.graduacaoId = "ID da Graduação é obrigatório.";
    if (!peso) errors.peso = "Peso é obrigatório.";
    else if (isNaN(parseFloat(peso)) || parseFloat(peso) <= 0) errors.peso = "Peso deve ser um número válido.";
    if (!esporteId) errors.esporteId = "ID do Esporte é obrigatório.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    const dataToSend = {
      nomeCompleto: name.trim(),
      email: email.trim(),
      password: password,
      dataNascimento: `${dataNascimento}T00:00:00.000Z`,
      cpf: cpf.trim().replace(/\D/g, ''),
      sexo: parseInt(sexo, 10),
      graduacaoId: parseInt(graduacaoId, 10),
      peso: parseFloat(peso),
      esporteId: parseInt(esporteId, 10),
      academiaId: academiaId ? parseInt(academiaId, 10) : null,
      professorId: professorId ? parseInt(professorId, 10) : null
    };

    try {
      const response = await api.post('/api/Atleta/cadastrar-atleta', dataToSend);
      console.log('Cadastro realizado com sucesso:', response.data);
      // Redirecionar após sucesso
    } catch (err) {
      console.error('Erro ao chamar API de cadastro:', err);
      setError(err.response?.data?.message || 'Falha na comunicação com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Cadastro de Atleta</h2>
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {error && <p className="form-error">{error}</p>}
          {/* Inputs para nome, email, senha, etc. */}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;