import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RegisterPage.css'; // Usará variáveis

const RegisterPage = () => {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para controle da UI e feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Erro geral do formulário
  const [fieldErrors, setFieldErrors] = useState({}); // Erros específicos de campos (opcional)

  const navigate = useNavigate();

  // Validação simples no front-end (pode ser mais robusta)
  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Nome completo é obrigatório.";
    if (!email.trim()) {
      errors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Formato de email inválido.";
    }
    if (!password) {
      errors.password = "Senha é obrigatória.";
    } else if (password.length < 6) { // Exemplo: Mínimo 6 caracteres
      errors.password = "Senha deve ter pelo menos 6 caracteres.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0; // Retorna true se não houver erros
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpa erro geral

    if (!validateForm()) {
      return; // Interrompe se a validação do front-end falhar
    }

    setIsLoading(true);

    console.log('Tentativa de Cadastro com:', { name, email, password });

    // --- Simulação/Placeholder para Chamada de API ---
    try {
      // TODO: Substituir por chamada fetch() ou axios() para sua API de registro
      // Exemplo: const response = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }), ... });
      // const data = await response.json();

      // Simulando sucesso após 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulando erro de email já existente (descomente para testar)
      // if (email === 'teste@existente.com') {
      //   throw new Error("Este email já está cadastrado.");
      // }
      // Simulando outro erro genérico
      // throw new Error("Falha ao conectar com o servidor.");

      // Se a API retornar sucesso:
      console.log('Cadastro bem-sucedido (simulado)!');
      // Poderia redirecionar para login ou mostrar mensagem de sucesso
      navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça o login.' } }); // Exemplo de redirecionamento com mensagem

    } catch (err) {
      console.error("Erro no cadastro:", err);
      // Define a mensagem de erro geral para exibir ao usuário
      setError(err.message || 'Ocorreu um erro ao tentar cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
    // --- Fim da Simulação/Placeholder ---
  };

  return (
    <div className="register-page"> {/* Estilizado em RegisterPage.css */}
      <div className="register-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          {/* Exibição de Erro Geral */}
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Nome Completo:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="name"
              aria-invalid={!!fieldErrors.name} // Indica campo inválido para acessibilidade
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && <p id="name-error" className="field-error">{fieldErrors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email-register">Email:</label> {/* ID diferente do login */}
            <input
              type="email"
              id="email-register"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-register-error" : undefined}
            />
            {fieldErrors.email && <p id="email-register-error" className="field-error">{fieldErrors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password-register">Senha:</label> {/* ID diferente do login */}
            <input
              type="password"
              id="password-register"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-register-error" : undefined}
            />
            {fieldErrors.password && <p id="password-register-error" className="field-error">{fieldErrors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-required="true"
              disabled={isLoading}
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            {fieldErrors.confirmPassword && <p id="confirmPassword-error" className="field-error">{fieldErrors.confirmPassword}</p>}
          </div>

          <button type="submit" className="button button--submit-register" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="form-link">
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </p>
         <p className="form-link form-link--secondary">
           <Link to="/">Voltar para a Home</Link>
         </p>
      </div>
    </div>
  );
};

// RegisterPage.propTypes = {};

export default RegisterPage;