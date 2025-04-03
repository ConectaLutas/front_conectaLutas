import React from 'react';
// import { Link } from 'react-router-dom'; // Se estiver usando
import './Header.css';
import logo from '../../assets/images/logo.png'; // Verifique o caminho

const Header = () => {
  const handleLogin = () => {
    alert('Botão Login Clicado!');
  };

  const handleRegister = () => {
    alert('Botão Cadastre-se Clicado!');
  };

  // const NavLink = ({ to, children }) => ( // Mantenha sua lógica de Link/a
  //    <a href={to}>{children}</a>
  // );
   // Temporário para o exemplo funcionar
   const NavLink = ({ to, children }) => <a href={to}>{children}</a>;


  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img src={logo} alt="Logo Jiujitsu Platform" />
        </NavLink>
      </div>
      <nav className="header__nav">
        <ul>
          <li><NavLink to="/">Início</NavLink></li>
          <li><NavLink to="/novidades">Novidades</NavLink></li>
          <li><NavLink to="/divulgue">Divulgue sua Academia</NavLink></li>
          <li><NavLink to="/quem-somos">Quem Somos</NavLink></li>
        </ul>
      </nav>
      <div className="header__actions">
        {/* Botão Login (sem classe específica extra) */}
        <button type="button" onClick={handleLogin}>Login</button>
        {/* Botão Cadastre-se COM a nova classe */}
        <button
          type="button"
          onClick={handleRegister}
          className="button--register" // <-- ADICIONADO A CLASSE AQUI
        >
          Cadastre-se
        </button>
      </div>
    </header>
  );
};

export default Header;