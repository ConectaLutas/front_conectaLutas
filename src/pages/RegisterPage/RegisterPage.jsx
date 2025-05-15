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
      // aqui você pode limpar o formulário ou redirecionar
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

          <div>
            <label>Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldErrors.name ? 'input-error' : ''}
            />
            {fieldErrors.name && <span className="error-msg">{fieldErrors.name}</span>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldErrors.email ? 'input-error' : ''}
            />
            {fieldErrors.email && <span className="error-msg">{fieldErrors.email}</span>}
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldErrors.password ? 'input-error' : ''}
            />
            {fieldErrors.password && <span className="error-msg">{fieldErrors.password}</span>}
          </div>

          <div>
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={fieldErrors.confirmPassword ? 'input-error' : ''}
            />
            {fieldErrors.confirmPassword && <span className="error-msg">{fieldErrors.confirmPassword}</span>}
          </div>

          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className={fieldErrors.dataNascimento ? 'input-error' : ''}
            />
            {fieldErrors.dataNascimento && <span className="error-msg">{fieldErrors.dataNascimento}</span>}
          </div>

          <div>
            <label>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={14} // formato 000.000.000-00
              className={fieldErrors.cpf ? 'input-error' : ''}
              placeholder="000.000.000-00"
            />
            {fieldErrors.cpf && <span className="error-msg">{fieldErrors.cpf}</span>}
          </div>

          <div>
            <label>Sexo</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className={fieldErrors.sexo ? 'input-error' : ''}
            >
              <option value="">Selecione</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
              <option value="3">Outro</option>
            </select>
            {fieldErrors.sexo && <span className="error-msg">{fieldErrors.sexo}</span>}
          </div>

          <div>
            <label>Graduação</label>
            <select
              value={graduacaoId}
              onChange={(e) => setGraduacaoId(e.target.value)}
              className={fieldErrors.graduacaoId ? 'input-error' : ''}
            >
              <option value="">Selecione</option>
              {graduacoes.map(g => (
                <option key={g.id} value={g.id}>{g.nome}</option>
              ))}
            </select>
            {fieldErrors.graduacaoId && <span className="error-msg">{fieldErrors.graduacaoId}</span>}
          </div>

          <div>
            <label>Peso (kg)</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className={fieldErrors.peso ? 'input-error' : ''}
              step="0.1"
            />
            {fieldErrors.peso && <span className="error-msg">{fieldErrors.peso}</span>}
          </div>

          <div>
            <label>Esporte</label>
            <select
              value={esporteId}
              onChange={(e) => setEsporteId(e.target.value)}
              className={fieldErrors.esporteId ? 'input-error' : ''}
            >
              <option value="">Selecione</option>
              {esportes.map(e => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>
            {fieldErrors.esporteId && <span className="error-msg">{fieldErrors.esporteId}</span>}
          </div>

          <div>
            <label>Academia</label>
            <select
              value={academiaId}
              onChange={(e) => setAcademiaId(e.target.value)}
            >
              <option value="">Selecione (opcional)</option>
              {academias.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Professor</label>
            <select
              value={professorId}
              onChange={(e) => setProfessorId(e.target.value)}
            >
              <option value="">Selecione (opcional)</option>
              {professores.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
