import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para link para cadastro
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui virá a lógica de autenticação (chamar API, etc.)
    console.log('Login attempt:', { email, password });
    alert('Tentativa de Login (ver console)');
    // Limpar campos após tentativa (opcional)
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <p className="register-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
         {/* Adicionar link para voltar à Home */}
         <p className="home-link">
           <Link to="/">Voltar para a Home</Link>
         </p>
      </div>
    </div>
  );
};

export default LoginPage;