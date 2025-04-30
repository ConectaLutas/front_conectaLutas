import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Componente auxiliar NavLink (sem alterações)
  const NavLink = ({ to, children }) => (
     <li><Link to={to}>{children}</Link></li>
  );

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="Logo Jiujitsu Platform" />
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          {/* Links existentes */}
          <NavLink to="/">Início</NavLink>
          <NavLink to="/novidades">Novidades</NavLink> {/* Manteve exemplo */}
          <NavLink to="/divulgue">Divulgue sua Academia</NavLink> {/* Manteve exemplo */}

          {/* --- ADICIONAR NOVO LINK DE NAVEGAÇÃO --- */}
          <NavLink to="/quem-somos">Quem Somos</NavLink>

        </ul>
      </nav>
      <div className="header__actions">
        <button type="button" onClick={handleLoginClick}>
          Login
        </button>
        <button
          type="button"
          onClick={handleRegisterClick}
          className="button--register"
        >
          Cadastre-se
        </button>
      </div>
    </header>
  );
};

export default Header;