import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/api';           // importe seu axios configurado
import './LoginPage.css';

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
      // login usando api (axios)
      const { data } = await api.post('/Usuario/login', { email, password });

      const token = data.token;
      localStorage.setItem('authToken', token);

      const decoded = jwtDecode(token);
      const usuarioId = decoded.userId || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const atletaResponse = await api.get(`/api/Atleta/por-usuario/${usuarioId}`);
      const atleta = atletaResponse.data;

      navigate(`/perfil/${atleta.id}`);
    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.response?.data?.message || err.message || 'Erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 id="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form" noValidate aria-labelledby="login-title">
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              disabled={isLoading}
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-login-error" : undefined}
            />
            {fieldErrors.email && <p id="email-login-error" className="field-error">{fieldErrors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              disabled={isLoading}
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-login-error" : undefined}
            />
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

export default LoginPage;
