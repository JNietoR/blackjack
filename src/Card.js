// Card.js
import React from 'react';

const Card = ({ name }) => {
  return (
    <div>
      {/* Renderizar la imagen de la carta */}
      <img src={name} alt={name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
};

export default Card;