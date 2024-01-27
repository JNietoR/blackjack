// DealerHand.js
import React from 'react';
import Card from './Card';

const DealerHand = ({ cards }) => {
  // Lógica relacionada con la mano del crupier

  return (
    <div>
      {cards.map((card, index) => (
        <Card key={index} name={card.name} value={card.value} />
      ))}
    </div>
  );
};

export default DealerHand;