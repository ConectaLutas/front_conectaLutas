import React from 'react';
// import PropTypes from 'prop-types'; // Footer simples, sem props por enquanto
import './Footer.css'; // Usará variáveis CSS

// Importar ícones (Exemplo com react-icons, instale com 'npm install react-icons')
// import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = {
    facebook: 'https://facebook.com', // Substitua pela URL real
    instagram: 'https://instagram.com', // Substitua pela URL real
    youtube: 'https://youtube.com', // Substitua pela URL real
  };

  return (
    <footer className="footer">
      <div className="container"> {/* Opcional: Usar container global */}
        <p className="footer__social-prompt">Siga-nos nas Redes Sociais</p>
        <div className="footer__icons">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Nossa página no Facebook">
            {/* <FaFacebookF /> */} FB {/* Placeholder */}
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Nosso perfil no Instagram">
            {/* <FaInstagram /> */} IG {/* Placeholder */}
          </a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="Nosso canal no YouTube">
            {/* <FaYoutube /> */} YT {/* Placeholder */}
          </a>
        </div>
        <div className="footer__copy">
          &copy; {currentYear} Sua Plataforma de JiuJitsu. Todos os direitos reservados.
          {/* Adicionar links úteis se necessário: | <Link to="/termos">Termos de Uso</Link> | <Link to="/privacidade">Política de Privacidade</Link> */}
        </div>
      </div>
    </footer>
  );
};

// Footer.propTypes = {
//   // Nenhuma prop externa por enquanto
// };

export default Footer;