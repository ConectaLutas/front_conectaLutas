// src/components/UserMenu/UserMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserMenu.css';
// Importe seus ícones aqui se for usar (ex: react-icons)
// import { FaUserCircle, FaEdit, FaBell, FaCog, FaTrophy, FaSignOutAlt } from 'react-icons/fa';
// import { jwtDecode } from 'jwt-decode'; // Descomente se for decodificar o token real aqui

// Ícones placeholder simples (você pode substituir por SVGs ou react-icons)
const IconPlaceholder = ({ children, className }) => <span className={`icon-placeholder ${className || ''}`}>{children}</span>;

IconPlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const getAtletaIdForProfile = () => {
    // Tenta pegar o ID do atleta logado, salvo durante o login real
    const loggedInAtletaId = localStorage.getItem('loggedInAtletaId');
    if (loggedInAtletaId) {
      return loggedInAtletaId;
    }

    // Fallback para ID simulado (para desenvolvimento/teste sem login real)
    const simulatedAtletaId = localStorage.getItem('simulatedAtletaId');
    if (simulatedAtletaId) {
      return simulatedAtletaId;
    }
    
    // Último fallback para um ID padrão se nenhum for encontrado
    // Idealmente, em produção, se não houver ID, o usuário não deveria ver este menu
    // ou o link de perfil deveria ser desabilitado/escondido.
    console.warn("Nenhum ID de atleta (real ou simulado) encontrado para o link do perfil. Usando '1'.");
    return '1';
  };
  const atletaProfileId = getAtletaIdForProfile();

  return (
    <div className="user-menu-container" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="user-menu-button" aria-label="Menu do usuário" aria-expanded={isOpen}>
        {/* Substitua pelo seu ícone/avatar real */}
        {/* Exemplo com react-icons: <FaUserCircle size={28} /> */}
        <IconPlaceholder className="header-user-icon">👤</IconPlaceholder>
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="user-dropdown-menu">
          <ul>
            <li>
              <NavLink
                to={`/perfil/${atletaProfileId}`}
                className={({ isActive }) => "dropdown-item " + (isActive ? "active-profile-link" : "")}
                onClick={closeDropdown}
              >
                <IconPlaceholder>🧑</IconPlaceholder> Meu Perfil
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil/editar" className="dropdown-item" onClick={closeDropdown}> {/* Rota placeholder */}
                <IconPlaceholder>📝</IconPlaceholder> Editar Perfil
              </NavLink>
            </li>
            <li>
              <NavLink to="/notificacoes" className="dropdown-item" onClick={closeDropdown}> {/* Rota placeholder */}
                <IconPlaceholder>🔔</IconPlaceholder> Notificações
              </NavLink>
            </li>
            <li>
              <NavLink to="/preferencias" className="dropdown-item" onClick={closeDropdown}> {/* Rota placeholder */}
                <IconPlaceholder>⚙️</IconPlaceholder> Preferências
              </NavLink>
            </li>
            <li>
              <NavLink to="/meus-campeonatos" className="dropdown-item" onClick={closeDropdown}> {/* Rota placeholder */}
                <IconPlaceholder>🏆</IconPlaceholder> Campeonatos
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item dropdown-item-button">
                <IconPlaceholder>🚪</IconPlaceholder> Sair
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

UserMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserMenu;