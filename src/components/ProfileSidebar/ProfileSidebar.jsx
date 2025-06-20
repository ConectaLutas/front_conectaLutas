// src/components/ProfileSidebar/ProfileSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Usaremos NavLink para estilo ativo
import './ProfileSidebar.css';

// Ícones podem ser importados de react-icons ou usar SVGs/placeholders
// import { FaUserCircle, FaEdit, FaBell, FaCog, FaTrophy } from 'react-icons/fa';

const ProfileSidebar = () => {
  return (
    <aside className="profile-sidebar">
      <nav>
        <ul>
          <li>
            {/* Adicionar ícone antes do texto se desejar */}
            <NavLink to="" end> {/* 'end' para correspondência exata */}
              {/* <FaUserCircle /> */} Meu Perfil
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;