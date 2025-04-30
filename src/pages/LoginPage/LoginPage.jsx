import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LoginPage.css'; // Precisa conter o estilo .field-error (ou estar global)

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Erro geral do formulário (ex: API)
  const [fieldErrors, setFieldErrors] = useState({}); // Estado para erros por campo
  const navigate = useNavigate();

  // --- NOVA FUNÇÃO DE VALIDAÇÃO ---
  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Validação básica de formato
      errors.email = "Formato de email inválido.";
    }
    if (!password.trim()) { // Verifica se a senha não está vazia (após remover espaços)
        errors.password = "Senha é obrigatória.";
    }
    // Adicione outras validações de front-end se desejar (ex: tamanho mínimo da senha)

    setFieldErrors(errors); // Atualiza o estado com os erros encontrados
    return Object.keys(errors).length === 0; // Retorna true se NENHUM erro foi encontrado
  };
  // --- FIM VALIDAÇÃO ---


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);     // Limpa erro geral
    setFieldErrors({}); // Limpa erros de campo anteriores

    // --- Executa a validação ---
    if (!validateForm()) {
      // Se a validação falhar, interrompe aqui
      return;
    }
    // --- Fim da validação ---

    // Só continua se a validação passou
    setIsLoading(true);
    console.log('Tentativa de Login com:', { email, password });

    // --- Simulação/Placeholder para Chamada de API ---
    try {
      // TODO: Chamar API...
      await new Promise(resolve => setTimeout(resolve, 1000));
      // throw new Error("Usuário ou senha inválidos."); // Teste de erro API

      console.log('Login bem-sucedido (simulado)!');
      navigate('/');

    } catch (err) {
      console.error("Erro no login:", err);
      // Define o erro geral (vindo da API, por exemplo)
      setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
    // --- Fim da Simulação ---
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Exibição de Erro Geral (vindo da API, etc) */}
          {error && <p className="form-error">{error}</p>}

          {/* Campo Email com Erro Específico */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required // 'required' HTML pode ser mantido, mas nossa validação JS é mais flexível
              aria-required="true"
              disabled={isLoading}
              autoComplete="email"
              aria-invalid={!!fieldErrors.email} // True se houver erro para este campo
              aria-describedby={fieldErrors.email ? "email-login-error" : undefined} // Linka com a msg de erro
            />
            {/* Exibe a mensagem de erro específica do campo */}
            {fieldErrors.email && <p id="email-login-error" className="field-error">{fieldErrors.email}</p>}
          </div>

          {/* Campo Senha com Erro Específico */}
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              aria-required="true"
              disabled={isLoading}
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-login-error" : undefined}
            />
            {/* Exibe a mensagem de erro específica do campo */}
            {fieldErrors.password && <p id="password-login-error" className="field-error">{fieldErrors.password}</p>}
          </div>

          <button type="submit" className="button button--submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="form-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
        <p className="form-link form-link--secondary">
          <Link to="/">Voltar para a Home</Link>
        </p>
      </div>
    </div>
  );
};

// LoginPage.propTypes = {}; // Se não houver props externas

export default LoginPage;