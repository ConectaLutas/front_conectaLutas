import React, { useState, useEffect } from 'react'; // Importar useEffect se for buscar dados para selects no futuro
import { Link, useNavigate } from 'react-router-dom';
// PropTypes não é essencial para este exemplo de integração, mas bom manter
// import PropTypes from 'prop-types';
import './RegisterPage.css';

const API_BASE_URL = 'https://plataformadecampeonato.onrender.com';

// Valores para o Enum Sexo (conforme Swagger: 1 ou 2)
const SexoEnum = {
  MASCULINO: 1,
  FEMININO: 2,
};

const RegisterPage = () => {
  // --- ESTADOS ADICIONAIS ---
  const [name, setName] = useState(''); // Mapeia para nomeCompleto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dataNascimento, setDataNascimento] = useState(''); // Novo
  const [cpf, setCpf] = useState('');                     // Novo
  const [sexo, setSexo] = useState('');                     // Novo (Guardará 1 ou 2)
  const [graduacaoId, setGraduacaoId] = useState('');           // Novo (ID)
  const [peso, setPeso] = useState('');                     // Novo (Número)
  const [esporteId, setEsporteId] = useState('');             // Novo (ID - Ex: 1 para Jiu-Jitsu?)
  const [academiaId, setAcademiaId] = useState('');           // Novo (ID - Opcional?)
  const [professorId, setProfessorId] = useState('');         // Novo (ID - Opcional?)
  // --- FIM ESTADOS ADICIONAIS ---

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // TODO: No futuro, carregar opções para Graduação, Esporte, Academia, Professor da API aqui com useEffect

  const validateForm = () => {
    const errors = {};
    // Validações existentes
    if (!name.trim()) errors.name = "Nome completo é obrigatório.";
    if (!email.trim()) errors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Formato de email inválido.";
    if (!password) errors.password = "Senha é obrigatória.";
    else if (password.length < 6) errors.password = "Senha deve ter pelo menos 6 caracteres.";
    if (password !== confirmPassword) errors.confirmPassword = "As senhas não coincidem.";

    // --- VALIDAÇÕES NOVAS (Campos obrigatórios baseados no schema, exceto opcionais) ---
    if (!dataNascimento) errors.dataNascimento = "Data de nascimento é obrigatória.";
    if (!cpf.trim()) errors.cpf = "CPF é obrigatório."; // Adicionar validação de formato de CPF seria ideal
    if (!sexo) errors.sexo = "Sexo é obrigatório.";
    if (!graduacaoId) errors.graduacaoId = "ID da Graduação é obrigatório.";
    if (!peso) errors.peso = "Peso é obrigatório.";
    else if (isNaN(parseFloat(peso)) || parseFloat(peso) <= 0) errors.peso = "Peso deve ser um número válido.";
    if (!esporteId) errors.esporteId = "ID do Esporte é obrigatório.";
    // academiaId e professorId são opcionais (nullable no DTO), não validamos aqui
    // --- FIM VALIDAÇÕES NOVAS ---

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    console.log('Enviando dados de cadastro para a API (Atleta/Usuario)...');

    // Montar o objeto de dados para enviar, convertendo tipos se necessário
    const dataToSend = {
        nomeCompleto: name.trim(),
        email: email.trim(),
        password: password,
        dataNascimento: dataNascimento, // Input date já deve dar formato YYYY-MM-DD
        cpf: cpf.trim().replace(/\D/g,''), // Remove não-dígitos (ex: pontos/traços) - backend deve esperar só números?
        sexo: parseInt(sexo, 10), // Converte para número (1 ou 2)
        graduacaoId: parseInt(graduacaoId, 10), // Converte para número
        peso: parseFloat(peso), // Converte para número decimal
        esporteId: parseInt(esporteId, 10), // Converte para número
        // Envia IDs opcionais apenas se preenchidos
        academiaId: academiaId ? parseInt(academiaId, 10) : null,
        professorId: professorId ? parseInt(professorId, 10) : null
      };

    console.log("Dados a enviar:", dataToSend); // Verificar o objeto antes de enviar

    try {
      const response = await fetch(`${API_BASE_URL}/api/Atleta/cadastrar-atleta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend), // Envia o objeto completo
      });

      if (!response.ok) {
        let errorMessage = `Erro ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData.errors) || errorMessage; // Tenta pegar erros de validação do backend
        } catch (parseError) { console.error("Não foi possível parsear resposta de erro:", parseError); }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log('Cadastro (Atleta/Usuario) realizado com sucesso:', responseData);
      navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça o login.' } });

    } catch (err) {
      console.error("Erro ao chamar API de cadastro (Atleta/Usuario):", err);
      setError(err.message || 'Falha na comunicação com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX ATUALIZADO COM NOVOS CAMPOS ---
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Cadastro de Atleta</h2> {/* Título mais específico */}
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {error && <p className="form-error">{error}</p>}

          {/* Campos existentes */}
          <div className="form-group">
            <label htmlFor="name">Nome Completo:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} aria-required="true" disabled={isLoading} autoComplete="name" aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
            {fieldErrors.name && <p id="name-error" className="field-error">{fieldErrors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email-register">Email:</label>
            <input type="email" id="email-register" value={email} onChange={(e) => setEmail(e.target.value)} aria-required="true" disabled={isLoading} autoComplete="email" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-register-error" : undefined} />
            {fieldErrors.email && <p id="email-register-error" className="field-error">{fieldErrors.email}</p>}
          </div>

           {/* --- NOVOS CAMPOS --- */}
           <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input type="date" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} aria-required="true" disabled={isLoading} autoComplete="bday" aria-invalid={!!fieldErrors.dataNascimento} aria-describedby={fieldErrors.dataNascimento ? "dataNascimento-error" : undefined} />
            {fieldErrors.dataNascimento && <p id="dataNascimento-error" className="field-error">{fieldErrors.dataNascimento}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="Somente números" aria-required="true" disabled={isLoading} autoComplete="off" aria-invalid={!!fieldErrors.cpf} aria-describedby={fieldErrors.cpf ? "cpf-error" : undefined} />
            {fieldErrors.cpf && <p id="cpf-error" className="field-error">{fieldErrors.cpf}</p>}
          </div>

           <div className="form-group">
            <label htmlFor="sexo">Sexo:</label>
            <select id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} aria-required="true" disabled={isLoading} aria-invalid={!!fieldErrors.sexo} aria-describedby={fieldErrors.sexo ? "sexo-error" : undefined} >
              <option value="" disabled>Selecione...</option>
              <option value={SexoEnum.MASCULINO}>Masculino</option>
              <option value={SexoEnum.FEMININO}>Feminino</option>
            </select>
            {fieldErrors.sexo && <p id="sexo-error" className="field-error">{fieldErrors.sexo}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="peso">Peso (kg):</label>
            <input type="number" step="0.1" id="peso" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 75.5" aria-required="true" disabled={isLoading} aria-invalid={!!fieldErrors.peso} aria-describedby={fieldErrors.peso ? "peso-error" : undefined} />
            {fieldErrors.peso && <p id="peso-error" className="field-error">{fieldErrors.peso}</p>}
          </div>

          <div className="form-group">
             {/* TODO: Trocar por Select quando buscar opções da API */}
            <label htmlFor="graduacaoId">ID da Graduação:</label>
            <input type="number" id="graduacaoId" value={graduacaoId} onChange={(e) => setGraduacaoId(e.target.value)} placeholder="Digite o ID (ex: 1=Branca, 2=Azul...)" aria-required="true" disabled={isLoading} aria-invalid={!!fieldErrors.graduacaoId} aria-describedby={fieldErrors.graduacaoId ? "graduacaoId-error" : undefined} />
            {fieldErrors.graduacaoId && <p id="graduacaoId-error" className="field-error">{fieldErrors.graduacaoId}</p>}
          </div>

          <div className="form-group">
            {/* TODO: Trocar por Select quando buscar opções da API */}
            <label htmlFor="esporteId">ID do Esporte:</label>
            <input type="number" id="esporteId" value={esporteId} onChange={(e) => setEsporteId(e.target.value)} placeholder="Digite o ID (ex: 1 para Jiu-Jitsu)" aria-required="true" disabled={isLoading} aria-invalid={!!fieldErrors.esporteId} aria-describedby={fieldErrors.esporteId ? "esporteId-error" : undefined} />
            {fieldErrors.esporteId && <p id="esporteId-error" className="field-error">{fieldErrors.esporteId}</p>}
          </div>

          <div className="form-group">
            {/* TODO: Trocar por Select quando buscar opções da API */}
            <label htmlFor="academiaId">ID da Academia (Opcional):</label>
            <input type="number" id="academiaId" value={academiaId} onChange={(e) => setAcademiaId(e.target.value)} placeholder="Digite o ID se souber" disabled={isLoading} />
          </div>

          <div className="form-group">
            {/* TODO: Trocar por Select quando buscar opções da API */}
            <label htmlFor="professorId">ID do Professor (Opcional):</label>
            <input type="number" id="professorId" value={professorId} onChange={(e) => setProfessorId(e.target.value)} placeholder="Digite o ID se souber" disabled={isLoading} />
          </div>
          {/* --- FIM NOVOS CAMPOS --- */}


          {/* Campos de senha existentes */}
          <div className="form-group">
            <label htmlFor="password-register">Senha:</label>
            <input type="password" id="password-register" value={password} onChange={(e) => setPassword(e.target.value)} aria-required="true" disabled={isLoading} autoComplete="new-password" aria-invalid={!!fieldErrors.password} aria-describedby={fieldErrors.password ? "password-register-error" : undefined}/>
            {fieldErrors.password && <p id="password-register-error" className="field-error">{fieldErrors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} aria-required="true" disabled={isLoading} autoComplete="new-password" aria-invalid={!!fieldErrors.confirmPassword} aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}/>
            {fieldErrors.confirmPassword && <p id="confirmPassword-error" className="field-error">{fieldErrors.confirmPassword}</p>}
          </div>

          <button type="submit" className="button button--submit-register" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Links existentes */}
        <p className="form-link"> Já tem uma conta? <Link to="/login">Faça Login</Link> </p>
         <p className="form-link form-link--secondary"> <Link to="/">Voltar para a Home</Link> </p>
      </div>
    </div>
  );
};

// RegisterPage.propTypes = {};

export default RegisterPage;