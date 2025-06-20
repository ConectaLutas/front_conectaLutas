import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Para link de detalhes
import './ChampionshipCard.css'; // Importar CSS do card

const ChampionshipCard = ({ title, date, location, image, detailsLink }) => {
  return (
    <div className="champ-card">
      <Link to={detailsLink || '#'} className="champ-card__link">
        <img
          src={image || 'https://picsum.photos/200/300' }
          alt={`Banner do evento ${title}`}
          className="champ-card__image"
          loading="lazy"
        />
        <div className="champ-card__content">
          <h3 className="champ-card__title">{title}</h3>
          <div className="champ-card__details">
            {/* Idealmente usar ícones aqui */}
            <span className="champ-card__detail champ-card__detail--date">
              🗓️ {date || 'Data a definir'}
            </span>
            <span className="champ-card__detail champ-card__detail--location">
              📍 {location || 'Local a definir'}
            </span>
          </div>
        </div>
      </Link>
      {/* Botão separado se o card inteiro não for clicável */}
      {/* <Link to={detailsLink || '#'} className="button button--details">Ver Detalhes</Link> */}
    </div>
  );
};

ChampionshipCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  location: PropTypes.string,
  image: PropTypes.string,
  detailsLink: PropTypes.string,
};

ChampionshipCard.defaultProps = {
  date: 'Data não informada',
  location: 'Local não informado',
  image: 'https://via.placeholder.com/400x250/cccccc/999999?text=Sem+Imagem',
  detailsLink: '#',
};

export default ChampionshipCard;