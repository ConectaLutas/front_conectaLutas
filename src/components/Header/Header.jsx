import React from 'react';
// Importa Link para navegação declarativa e useNavigate para navegação programática
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Importa o CSS específico do Header
import logo from '../../assets/images/logo.png'; // Caminho para a logo

const Header = () => {
  // Hook useNavigate: retorna uma função que permite navegar programaticamente
  const navigate = useNavigate();

  // Função para lidar com o clique no botão Login
  const handleLoginClick = () => {
    console.log('Navegando para /login'); // Log para depuração
    navigate('/login'); // Usa a função navigate para ir para a rota /login
  };

  // Função para lidar com o clique no botão Cadastre-se
  const handleRegisterClick = () => {
    console.log('Navegando para /register'); // Log para depuração
    navigate('/register'); // Usa a função navigate para ir para a rota /register
  };

  // Componente auxiliar para links de navegação (opcional, mas organiza)
  // Usa o <Link> do react-router-dom para navegação sem recarregar a página
  const NavLink = ({ to, children }) => (
     <li><Link to={to}>{children}</Link></li>
  );

  return (
    <header className="header">
      <div className="header__logo">
        {/* Logo também é um link para a página inicial */}
        <Link to="/">
          <img src={logo} alt="Logo Jiujitsu Platform" />
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          {/* Links de navegação principais */}
          <NavLink to="/">Início</NavLink>
          {/* Links para rotas futuras (precisarão ser definidas no App.jsx) */}
          <NavLink to="/novidades">Novidades</NavLink>
          <NavLink to="/divulgue">Divulgue sua Academia</NavLink>
          <NavLink to="/quem-somos">Quem Somos</NavLink>
        </ul>
      </nav>
      <div className="header__actions">
        {/* Botão de Login */}
        <button type="button" onClick={handleLoginClick}>
          Login
        </button>
        {/* Botão de Cadastro */}
        <button
          type="button"
          onClick={handleRegisterClick}
          className="button--register" // Classe para o estilo amarelo
        >
          Cadastre-se
        </button>
      </div>
    </header>
  );
};

export default Header;