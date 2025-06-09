// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/api';
import './LoginPage.css';
// Se você for usar um ícone real do Google, importe-o aqui
// import GoogleIcon from '../../assets/icons/google-icon.svg'; // Exemplo

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) errors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Formato de email inválido.";
    if (!password.trim()) errors.password = "Senha é obrigatória.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!validateForm()) return;

    setIsLoading(true);
try {
      const { data } = await api.post('/Usuario/login', { email, password });
      const token = data.token;
      localStorage.setItem('authToken', token);

      const decoded = jwtDecode(token);
      console.log('Token decodificado:', decoded); 

      const usuarioId = decoded.userId || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      
      try {
        const atletaResponse = await api.get(`/api/Atleta/por-usuario/${usuarioId}`);
        const atleta = atletaResponse.data;
        if (atleta && atleta.id) {
          localStorage.setItem('loggedInAtletaId', atleta.id);
          
          window.dispatchEvent(new CustomEvent('authChange')); // <<< DISPARAR EVENTO
          
          navigate(`/perfil/${atleta.id}`);
        } else {
          // ... (tratamento se atleta não encontrado)
          window.dispatchEvent(new CustomEvent('authChange')); // Disparar mesmo se atleta não encontrado, mas login OK
          navigate('/'); 
        }
      } catch (atletaError) {
        // ... (tratamento de erro ao buscar atleta)
        window.dispatchEvent(new CustomEvent('authChange')); // Disparar para garantir que o header reaja ao token
        navigate('/'); 
      }
    } catch (err) {
      // ... (seu tratamento de erro de login)
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="login-page">
      <div className="login-container">
        <h2 id="login-title">Bem-vindo de volta!</h2>
        <form onSubmit={handleSubmit} className="login-form" noValidate aria-labelledby="login-title">
          {error && <p className="form-error-api">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              disabled={isLoading}
              autoComplete="email"
              className={fieldErrors.email ? 'input-error' : ''}
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-login-error" : undefined}
            />
            {fieldErrors.email && <p id="email-login-error" className="error-msg">{fieldErrors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={isLoading}
              autoComplete="current-password"
              className={fieldErrors.password ? 'input-error' : ''}
              aria-required="true"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-login-error" : undefined}
            />
            {fieldErrors.password && <p id="password-login-error" className="error-msg">{fieldErrors.password}</p>}
          </div>

          <div className="form-options">
            <div className="form-check">
              <input type="checkbox" id="rememberLogin" />
              <label htmlFor="rememberLogin">Lembrar login</label>
            </div>
            <Link to="/esqueci-senha" className="forgot-password-link">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className="button button--submit-login" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* REMOVIDO: Separador "OU" e Botão "Entrar com Google"
          <div className="separator-or">
            <span className="line"></span>
            <span>OU</span>
            <span className="line"></span>
          </div>

          <button type="button" className="button button--google-login" disabled={isLoading}>
            <span className="google-icon-placeholder">G</span>
            Entrar com Google
          </button>
          */}
        </form>

        <p className="register-link-login">
          Não tem uma conta? <Link to="/register">Criar uma conta</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;