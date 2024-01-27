// Deck.js
import React, { useEffect, useState } from 'react';

const Deck = ({ onShuffle }) => {
  // Define el mazo inicial directamente en el componente
  const initialDeck = [
    { name: "2_of_hearts.png", value: 2 },
    { name: "3_of_hearts.png", value: 3 },
    { name: "4_of_hearts.png", value: 4 },
    { name: "5_of_hearts.png", value: 5 },
    { name: "6_of_hearts.png", value: 6 },
    { name: "7_of_hearts.png", value: 7 },
    { name: "8_of_hearts.png", value: 8 },
    { name: "9_of_hearts.png", value: 9 },
    { name: "10_of_hearts.png", value: 10 },
    { name: "jack_of_hearts2.png", value: 10 },
    { name: "queen_of_hearts2.png", value: 10 },
    { name: "king_of_hearts2.png", value: 10 },
    { name: "ace_of_hearts.png", value: 11 },
    { name: "2_of_diamonds.png", value: 2 },
    { name: "3_of_diamonds.png", value: 3 },
    { name: "4_of_diamonds.png", value: 4 },
    { name: "5_of_diamonds.png", value: 5 },
    { name: "6_of_diamonds.png", value: 6 },
    { name: "7_of_diamonds.png", value: 7 },
    { name: "8_of_diamonds.png", value: 8 },
    { name: "9_of_diamonds.png", value: 9 },
    { name: "10_of_diamonds.png", value: 10 },
    { name: "jack_of_diamonds2.png", value: 10 },
    { name: "queen_of_diamonds2.png", value: 10 },
    { name: "king_of_diamonds2.png", value: 10 },
    { name: "ace_of_diamonds.png", value: 11 },
    { name: "2_of_clubs.png", value: 2 },
    { name: "3_of_clubs.png", value: 3 },
    { name: "4_of_clubs.png", value: 4 },
    { name: "5_of_clubs.png", value: 5 },
    { name: "6_of_clubs.png", value: 6 },
    { name: "7_of_clubs.png", value: 7 },
    { name: "8_of_clubs.png", value: 8 },
    { name: "9_of_clubs.png", value: 9 },
    { name: "10_of_clubs.png", value: 10 },
    { name: "jack_of_clubs2.png", value: 10 },
    { name: "queen_of_clubs2.png", value: 10 },
    { name: "king_of_clubs2.png", value: 10 },
    { name: "ace_of_clubs.png", value: 11 },
    { name: "2_of_spades.png", value: 2 },
    { name: "3_of_spades.png", value: 3 },
    { name: "4_of_spades.png", value: 4 },
    { name: "5_of_spades.png", value: 5 },
    { name: "6_of_spades.png", value: 6 },
    { name: "7_of_spades.png", value: 7 },
    { name: "8_of_spades.png", value: 8 },
    { name: "9_of_spades.png", value: 9 },
    { name: "10_of_spades.png", value: 10 },
    { name: "jack_of_spades2.png", value: 10 },
    { name: "queen_of_spades2.png", value: 10 },
    { name: "king_of_spades2.png", value: 10 },
    { name: "ace_of_spades.png", value: 11 }
  ];

  // Utiliza el estado interno para manejar el mazo actual
  const [deck, setDeck] = useState(initialDeck);

  useEffect(() => {
    // Realiza la lógica de barajado
    const shuffledDeck = [...deck];
    let currentIndex = shuffledDeck.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
        shuffledDeck[randomIndex],
        shuffledDeck[currentIndex],
      ];
    }

    // Llama a la función proporcionada para manejar el mazo barajado
    onShuffle(shuffledDeck);
  }, [deck, onShuffle]);

  return <div />;
};

export default Deck;
