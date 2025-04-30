import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importar PropTypes
import './Header.css'; // Usará variáveis CSS definidas em index.css
import logo from '../../assets/images/logo.png';

// --- Componente Auxiliar NavLink (interno ou movido para arquivo separado) ---
// Adicionando PropTypes a ele também
const NavLink = ({ to, children }) => (
  <li><Link to={to}>{children}</Link></li>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
// --- Fim NavLink ---


const Header = () => {
  const navigate = useNavigate();

  // Funções de navegação (sem necessidade de mudança)
  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" aria-label="Página Inicial"> {/* aria-label para link de logo */}
          <img src={logo} alt="Logo Plataforma JiuJitsu" /> {/* Alt text mais específico */}
        </Link>
      </div>

      <nav className="header__nav" aria-label="Navegação Principal">
        <ul>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/novidades">Novidades</NavLink>
          {/* <<< GARANTIR QUE O 'to' CORRESPONDE À ROTA DEFINIDA NO App.jsx >>> */}
          <NavLink to="/divulgue">Divulgue sua Academia</NavLink>
          <NavLink to="/quem-somos">Quem Somos</NavLink>
        </ul>
      </nav>

      <div className="header__actions">
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
      </div>
    </header>
  );
};

export default Header;