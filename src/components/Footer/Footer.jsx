import React from 'react';
import './Footer.css';
// Opcional: importar ícones de uma biblioteca (ex: react-icons)
// import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  // Links corretos ou placeholders
  const socialLinks = {
    facebook: 'https://facebook.com', // Use a URL real da sua página
    instagram: 'https://instagram.com', // Use a URL real da sua página
    youtube: 'https://youtube.com', // Use a URL real do seu canal
  };

  return (
    <footer className="footer">
      <p>Siga-nos nas Redes Sociais</p>
      <div className="footer__icons">
        {/* Usando ícones (exemplo com texto, idealmente usar ícones SVG ou Font Icon) */}
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          {/* <FaFacebook />  // Exemplo com react-icons */}
          FB
        </a>
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          {/* <FaInstagram /> // Exemplo com react-icons */}
          IG
        </a>
        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          {/* <FaYoutube />   // Exemplo com react-icons */}
          YT {/* Corrigido link placeholder */}
        </a>
      </div>
      <div className="footer__copy">
         {/* Adicionar ano dinâmico e informações de copyright */}
         &copy; {new Date().getFullYear()} Sua Plataforma de JiuJitsu. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;