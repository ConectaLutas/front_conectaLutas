// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../../assets/images/logo.jpg';
import UserMenu from '../UserMenu/UserMenu';

const NavLinkItem = ({ to, children, end }) => (
  <li><RouterNavLink to={to} className={({ isActive }) => isActive ? "active-nav-link" : ""} end={end}>{children}</RouterNavLink></li>
);

NavLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  end: PropTypes.bool
};
NavLinkItem.defaultProps = {
  end: false,
};

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken')); // Inicializa o estado lendo o localStorage

  useEffect(() => {
    const handleAuthChange = () => {
      // console.log('AuthChange event detected or storage changed'); // Para depuração
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    // Verifica no mount (o estado inicial já faz isso, mas podemos manter para consistência se preferir)
    // handleAuthChange(); 

    // Ouve o evento customizado 'authChange' disparado pelo Login/Logout na mesma aba
    window.addEventListener('authChange', handleAuthChange);
    // Ouve o evento 'storage' para mudanças em outras abas/janelas
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []); // Array de dependências vazio para rodar apenas no mount e limpar no unmount

  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInAtletaId');
    localStorage.removeItem('simulatedAtletaId');
    
    window.dispatchEvent(new CustomEvent('authChange')); // <<< DISPARAR EVENTO NO LOGOUT
    
    // setIsLoggedIn(false); // O evento 'authChange' vai cuidar de atualizar o estado
    navigate('/login');
  };

  const navLinksLoggedOut = [
    { to: "/", label: "Início", end: true },
    { to: "/novidades", label: "Novidades" },
    { to: "/divulgue", label: "Divulgue sua Academia" },
    { to: "/quem-somos", label: "Quem Somos" },
  ];

  const navLinksLoggedIn = [
    { to: "/", label: "Início", end: true },
    { to: "/eventos", label: "Eventos" },
    { to: "/atletas", label: "Atletas" },
    { to: "/chaves", label: "Chaves" },
    { to: "/ranking", label: "Ranking" },
  ];

  const currentNavLinks = isLoggedIn ? navLinksLoggedIn : navLinksLoggedOut;

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" aria-label="Página Inicial">
          <img src={logo} alt="Logo Conecta Lutas" />
        </Link>
      </div>

      <nav className="header__nav" aria-label="Navegação Principal">
        <ul>
          {currentNavLinks.map(link => (
            <NavLinkItem key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLinkItem>
          ))}
        </ul>
      </nav>

      <div className="header__actions">
        {isLoggedIn ? (
          <UserMenu onLogout={handleLogout} />
        ) : (
          <>
            <button type="button" onClick={handleLoginClick} className="button button--login">
              Login
            </button>
            <button
              type="button"
              onClick={handleRegisterClick}
              className="button button--register"
            >
              Cadastre-se
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;