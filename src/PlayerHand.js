// PlayerHand.js
import React from 'react';
import Card from './Card';

const PlayerHand = ({ cards }) => {
  // Lógica relacionada con la mano del jugador

  return (
    <div>
      {cards.map((card, index) => (
        <Card key={index} name={card.name} value={card.value} />
      ))}
    </div>
  );
};

export default PlayerHand;