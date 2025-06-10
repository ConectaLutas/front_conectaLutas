// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionar Link
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
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const navigate = useNavigate();

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

  // Função para validar senha com requisitos específicos
  const validatePassword = (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[@#$%&*!?]/.test(password)
    };
    return requirements;
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Nome completo é obrigatório.";
    if (!email.trim()) errors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Formato de email inválido.";
    
    if (!password) {
      errors.password = "Senha é obrigatória.";
    } else {
      const passwordValidation = validatePassword(password);
      const failedRequirements = [];
      
      if (!passwordValidation.minLength) failedRequirements.push("mínimo 8 caracteres");
      if (!passwordValidation.hasUppercase) failedRequirements.push("ao menos 1 letra maiúscula");
      if (!passwordValidation.hasLowercase) failedRequirements.push("ao menos 1 letra minúscula");
      if (!passwordValidation.hasNumber) failedRequirements.push("ao menos 1 número");
      if (!passwordValidation.hasSpecialChar) failedRequirements.push("ao menos 1 caractere especial");
      
      if (failedRequirements.length > 0) {
        errors.password = `A senha deve conter: ${failedRequirements.join(", ")}.`;
      }
    }
    
    if (password !== confirmPassword) errors.confirmPassword = "As senhas não coincidem.";
    if (!dataNascimento) errors.dataNascimento = "Data de nascimento é obrigatória.";
    
    // Validação de CPF mais robusta
    if (!cpf.trim()) {
      errors.cpf = "CPF é obrigatório.";
    } else {
      const cpfNumbers = cpf.trim().replace(/\D/g, '');
      if (cpfNumbers.length !== 11) {
        errors.cpf = "CPF deve conter 11 dígitos.";
      } else if (!isValidCPF(cpfNumbers)) {
        errors.cpf = "CPF inválido.";
      }
    }
    
    if (!sexo) errors.sexo = "Sexo é obrigatório.";
    if (!graduacaoId) errors.graduacaoId = "Graduação é obrigatória.";
    if (!peso) errors.peso = "Peso é obrigatório.";
    else if (isNaN(parseFloat(peso)) || parseFloat(peso) <= 0) errors.peso = "Peso deve ser um número válido.";
    if (!esporteId) errors.esporteId = "Esporte é obrigatório.";
    // Academia e Professor são opcionais no Figma, então não validar obrigatoriedade aqui
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para validar CPF
  const isValidCPF = (cpf) => {
    // Elimina CPFs conhecidos como inválidos
    if (cpf === "00000000000" || 
        cpf === "11111111111" || 
        cpf === "22222222222" || 
        cpf === "33333333333" || 
        cpf === "44444444444" || 
        cpf === "55555555555" || 
        cpf === "66666666666" || 
        cpf === "77777777777" || 
        cpf === "88888888888" || 
        cpf === "99999999999") {
      return false;
    }

    // Valida 1º dígito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    // Valida 2º dígito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');
    setFieldErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    const dataToSend = {
      nomeCompleto: name.trim(),
      email: email.trim(),
      password: password,
      // A API espera YYYY-MM-DDTHH:mm:ss
      dataNascimento: `${dataNascimento}T00:00:00`, // Ajustar para enviar hora se necessário, ou o backend trata
      cpf: cpf.trim().replace(/\D/g, ''), // Enviar apenas números para o CPF
      sexo: parseInt(sexo, 10),
      graduacaoId: parseInt(graduacaoId, 10),
      peso: parseFloat(peso),
      esporteId: parseInt(esporteId, 10),
      academiaId: academiaId ? parseInt(academiaId, 10) : null,
      professorId: professorId ? parseInt(professorId, 10) : null
    };

    try {
      const response = await api.post('/api/Atleta/cadastrar-atleta', dataToSend);
      if (response.status === 201 || response.status === 200) { // Algumas APIs retornam 200 para POST
        setSuccessMessage(response.data.mensagem ||'Cadastro realizado com sucesso! Redirecionando para login...');
        // Limpar formulário
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDataNascimento('');
        setCpf('');
        setSexo('');
        setGraduacaoId('');
        setPeso('');
        setEsporteId('');
        setAcademiaId('');
        setProfessorId('');
        setTimeout(() => navigate('/login'), 2000); // Atraso para exibir a mensagem
      }
    } catch (err) {
      console.error('Erro ao chamar API de cadastro:', err);
      if (err.response && err.response.data) {
        // Se a API retornar múltiplos erros em um formato específico:
        if (typeof err.response.data.errors === 'object') {
          const backendErrors = {};
          for (const key in err.response.data.errors) {
            backendErrors[key.toLowerCase()] = err.response.data.errors[key].join(', ');
          }
          setFieldErrors(prevErrors => ({...prevErrors, ...backendErrors}));
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (Array.isArray(err.response.data) && err.response.data[0]?.errorMessage) {
           setError(err.response.data.map(e => e.errorMessage).join('; '));
        } else {
          setError('Falha no cadastro. Verifique os dados e tente novamente.');
        }
      } else {
        setError('Falha na comunicação com o servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Função para formatar CPF enquanto digita (opcional, mas melhora UX)
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  };


  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Cadastro de Atleta</h2>
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {successMessage && <p className="form-success">{successMessage}</p>}
          {error && <p className="form-error-api">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className={fieldErrors.name ? 'input-error' : ''}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && <span id="name-error" className="error-msg">{fieldErrors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className={fieldErrors.email ? 'input-error' : ''}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && <span id="email-error" className="error-msg">{fieldErrors.email}</span>}
          </div>

          <div className="form-group password-field-container">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowPasswordTooltip(true)}
              onBlur={() => setShowPasswordTooltip(false)}
              placeholder="Crie uma senha"
              className={fieldErrors.password ? 'input-error' : ''}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            {fieldErrors.password && <span id="password-error" className="error-msg">{fieldErrors.password}</span>}
            
            {/* Tooltip com indicadores visuais dos requisitos da senha */}
            {password && showPasswordTooltip && (
              <div className="password-tooltip">
                <div className="tooltip-arrow"></div>
                <p className="tooltip-title">A senha deve conter:</p>
                <ul className="tooltip-requirements">
                  <li className={validatePassword(password).minLength ? 'requirement-met' : 'requirement-unmet'}>
                    <span className="requirement-icon">{validatePassword(password).minLength ? '✓' : '✗'}</span>
                    No mínimo 8 caracteres
                  </li>
                  <li className={validatePassword(password).hasUppercase ? 'requirement-met' : 'requirement-unmet'}>
                    <span className="requirement-icon">{validatePassword(password).hasUppercase ? '✓' : '✗'}</span>
                    Ao menos 1 letra maiúscula (A-Z)
                  </li>
                  <li className={validatePassword(password).hasLowercase ? 'requirement-met' : 'requirement-unmet'}>
                    <span className="requirement-icon">{validatePassword(password).hasLowercase ? '✓' : '✗'}</span>
                    Ao menos 1 letra minúscula (a-z)
                  </li>
                  <li className={validatePassword(password).hasNumber ? 'requirement-met' : 'requirement-unmet'}>
                    <span className="requirement-icon">{validatePassword(password).hasNumber ? '✓' : '✗'}</span>
                    Ao menos 1 número (0-9)
                  </li>
                  <li className={validatePassword(password).hasSpecialChar ? 'requirement-met' : 'requirement-unmet'}>
                    <span className="requirement-icon">{validatePassword(password).hasSpecialChar ? '✓' : '✗'}</span>
                    Ao menos 1 caractere especial (@, #, $, %, &, *, etc.)
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirma Senha</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua Senha"
              className={fieldErrors.confirmPassword ? 'input-error' : ''}
              aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            {fieldErrors.confirmPassword && <span id="confirmPassword-error" className="error-msg">{fieldErrors.confirmPassword}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                id="dataNascimento"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                placeholder="DD/MM/AAAAA"
                className={fieldErrors.dataNascimento ? 'input-error' : ''}
                aria-describedby={fieldErrors.dataNascimento ? "dataNascimento-error" : undefined}
              />
              {fieldErrors.dataNascimento && <span id="dataNascimento-error" className="error-msg">{fieldErrors.dataNascimento}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={handleCpfChange} // Usar a função de formatação
                maxLength={14}
                placeholder="000.000.000-00"
                className={fieldErrors.cpf ? 'input-error' : ''}
                aria-describedby={fieldErrors.cpf ? "cpf-error" : undefined}
              />
              {fieldErrors.cpf && <span id="cpf-error" className="error-msg">{fieldErrors.cpf}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sexo">Sexo</label>
              <select
                id="sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className={fieldErrors.sexo ? 'input-error' : ''}
                aria-describedby={fieldErrors.sexo ? "sexo-error" : undefined}
              >
                <option value="">Selecione</option>
                <option value="1">Masculino</option>
                <option value="2">Feminino</option>
              </select>
              {fieldErrors.sexo && <span id="sexo-error" className="error-msg">{fieldErrors.sexo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="graduacaoId">Graduação</label>
              <select
                id="graduacaoId"
                value={graduacaoId}
                onChange={(e) => setGraduacaoId(e.target.value)}
                className={fieldErrors.graduacaoId ? 'input-error' : ''}
                aria-describedby={fieldErrors.graduacaoId ? "graduacaoId-error" : undefined}
              >
                <option value="">Selecione</option>
                {graduacoes.map(g => (
                  <option key={g.id} value={g.id}>{g.nome}</option>
                ))}
              </select>
              {fieldErrors.graduacaoId && <span id="graduacaoId-error" className="error-msg">{fieldErrors.graduacaoId}</span>}
            </div>
          </div>

          <div className="form-group"> {/* Esporte agora ocupa linha inteira */}
            <label htmlFor="esporteId">Esporte</label>
            <select
              id="esporteId"
              value={esporteId}
              onChange={(e) => setEsporteId(e.target.value)}
              className={fieldErrors.esporteId ? 'input-error' : ''}
              aria-describedby={fieldErrors.esporteId ? "esporteId-error" : undefined}
            >
              <option value="">Selecione</option>
              {esportes.map(e => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>
            {fieldErrors.esporteId && <span id="esporteId-error" className="error-msg">{fieldErrors.esporteId}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="academiaId">Academia (opcional)</label>
              <select
                id="academiaId"
                value={academiaId}
                onChange={(e) => setAcademiaId(e.target.value)}
              >
                <option value="">Selecione</option>
                {academias.map(a => (
                  <option key={a.id} value={a.id}>{a.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="professorId">Professor (opcional)</label>
              <select
                id="professorId"
                value={professorId}
                onChange={(e) => setProfessorId(e.target.value)}
              >
                <option value="">Selecione</option>
                {professores.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="peso">Peso (kg)</label>
            <input
              id="peso"
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Digite seu peso"
              className={fieldErrors.peso ? 'input-error' : ''}
              step="0.1"
              aria-describedby={fieldErrors.peso ? "peso-error" : undefined}
            />
            {fieldErrors.peso && <span id="peso-error" className="error-msg">{fieldErrors.peso}</span>}
          </div>
          
          <button type="submit" className="button button--submit-register" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className="login-link">
          Já tem uma conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;