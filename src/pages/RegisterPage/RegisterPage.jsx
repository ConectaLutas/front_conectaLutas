import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para link para login
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Aqui virá a lógica de registro (chamar API, etc.)
    console.log('Register attempt:', { name, email, password });
    alert('Tentativa de Cadastro (ver console)');
    // Limpar campos (opcional)
    // setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Cadastrar</button>
        </form>
        <p className="login-link">
          Já tem uma conta? <Link to="/login">Faça Login</Link>
        </p>
         {/* Adicionar link para voltar à Home */}
         <p className="home-link">
           <Link to="/">Voltar para a Home</Link>
         </p>
      </div>
    </div>
  );
};

export default RegisterPage;