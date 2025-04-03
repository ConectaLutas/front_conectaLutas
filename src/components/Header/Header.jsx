import React from 'react';
// Se estiver usando React Router para navegação SPA
// import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png'; // Certifique-se que o caminho está correto

const Header = () => {
  // Funções placeholder para os botões
  const handleLogin = () => {
    alert('Botão Login Clicado!');
    // Aqui iria a lógica de login/redirecionamento
  };

  const handleRegister = () => {
    alert('Botão Cadastre-se Clicado!');
    // Aqui iria a lógica de cadastro/redirecionamento
  };

  // Use <Link> se estiver usando react-router-dom, senão mantenha <a>
  const NavLink = ({ to, children }) => (
     // <Link to={to}>{children}</Link> // Opção com React Router
     <a href={to}>{children}</a> // Opção sem React Router
  );

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/"> {/* Link para a página inicial */}
          <img src={logo} alt="Logo Jiujitsu Platform" /> {/* Alt text mais descritivo */}
        </NavLink>
      </div>
      <nav className="header__nav">
        <ul>
          {/* Usando NavLink para consistência */}
          <li><NavLink to="/">Início</NavLink></li>
          <li><NavLink to="/novidades">Novidades</NavLink></li>
          <li><NavLink to="/divulgue">Divulgue sua Academia</NavLink></li>
          <li><NavLink to="/quem-somos">Quem Somos</NavLink></li>
        </ul>
      </nav>
      <div className="header__actions">
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleRegister}>Cadastre-se</button>
      </div>
    </header>
  );
};

export default Header;