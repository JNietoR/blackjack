// App.js
import React, { useState, useEffect } from 'react';

const deckInicial = [
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

function shuffleDeck(deck) {
  // Create a copy of the original array to avoid modifying the original array
  const shuffledDeck = [...deck];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
}

// Baraja el deck al comienzo
const shuffledDeck = shuffleDeck(deckInicial);

const App = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [hitCard, setHitCard] = useState([]);
  const [showDealerFirstCard, setShowDealerFirstCard] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState([]);

  useEffect(() => {
    const initialDeck = shuffleDeck([...deckInicial]);
    setShuffledDeck(initialDeck);

    //Hace pop de la baraja para el jugador
    const initialPlayerCards = [initialDeck.pop()];
    setPlayerCards(initialPlayerCards);

    // Hace pop de la baraja para otra carta para el dealer y mete una oculta con valor 0
    const initialDealerCards = [initialDeck.pop(), { name: 'back.png', value: 0 }];
    setDealerCards(initialDealerCards);
  }, []);

  const handleHit = () => {
    const card = shuffledDeck.pop();
    setHitCard(card);
    setPlayerCards([...playerCards, card]);
  };

  const handleStand = () => {
    setShowDealerFirstCard(true);

    // Draw cards for the dealer until the sum is 17 or higher
    let dealerHand = [...dealerCards];
    while (calculateScore(dealerHand) < 17) {
      const card = shuffledDeck.pop();
      dealerHand = [...dealerHand, card];
    }

    // Remove the hidden card from the dealer's hand
    dealerHand = dealerHand.slice(0, 1).concat(dealerHand.slice(2));
    setDealerCards(dealerHand);
  };

  const calculateScore = (cards) => {
    return cards.reduce((total, card) => total + card.value, 0);
  };

  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);

  return (
    <div>
      <div>
        <div>
          <h2>Dealer Score: {dealerScore}</h2>
          {dealerCards.map((card, index) => (
            <img
              key={index}
              src={`./assets/PNG/${showDealerFirstCard || index === 0 ? card.name : 'back.png'}`}
              alt={card.name}
              style={{ width: '100px', height: '150px' }} // Establece el ancho y alto fijo
            />
          ))}
        </div>
        <div>
          <button onClick={handleHit}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </div>
        <div>
          <h2>Player Score: {playerScore}</h2>
          {playerCards.map((card, index) => (
            <img
              key={index}
              src={`./assets/PNG/${card.name}`}
              alt={card.name}
              style={{ width: '100px', height: '150px' }} // Establece el ancho y alto fijo
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;