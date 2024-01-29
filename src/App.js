import React from 'react';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCards: [],
      dealerCards: [],
      hitCard: [],
      showDealerFirstCard: false,
      shuffledDeck: [],
      playerScore: 0,
      dealerScore: 0
    };
  }

  componentDidMount() {
    this.resetGame();
  };

  resetGame = () => {
    const initialDeck = shuffleDeck([...deckInicial]);
    this.setState({ shuffledDeck: initialDeck });

    // Hace pop de la baraja para el jugador
    const initialPlayerCards = [initialDeck.pop()];
    this.setState({ playerCards: initialPlayerCards });
    this.calculatePlayerScore(initialPlayerCards);

    // Hace pop de la baraja para otra carta para el dealer y mete una oculta con valor 0
    const initialDealerCards = [initialDeck.pop(), { name: 'back.png', value: 0 }];
    this.setState({ dealerCards: initialDealerCards });
    this.calculateDealerScore(initialDealerCards);
  };

  handleHit = () => {
    const card = this.state.shuffledDeck.pop();
    this.setState({ hitCard: card });
    this.setState({ playerCards: [...this.state.playerCards, card] });
    this.calculatePlayerScore([...this.state.playerCards, card]);
  };

  handleDealerHit = () => {
    let dealerHand = [...this.state.dealerCards];
    const card = this.state.shuffledDeck.pop();

    // Si la carta oculta aún está en la mano del dealer, añade la nueva carta
    if (dealerHand.some(card => card.value === 0)) {
      dealerHand = [...dealerHand, card];
    } else {
      dealerHand = [...dealerHand, card];
    }

    this.setState({ dealerCards: dealerHand });
    this.calculateDealerScore(dealerHand);
  };

  handleStand = () => {
    this.setState({ showDealerFirstCard: true });
    let dealerHand = [...this.state.dealerCards];
    // Remove the hidden card from the dealer's hand
    if (dealerHand.some(card => card.value === 0)) {
      dealerHand = dealerHand.slice(0, 1).concat(dealerHand.slice(2));
      const card = this.state.shuffledDeck.pop();
      dealerHand = [...dealerHand, card];
    }
    // Draw cards for the dealer until the sum is 17 or higher
    while (this.calculateScore(dealerHand) < 17) {
      const card = this.state.shuffledDeck.pop();
      dealerHand = [...dealerHand, card];
    }
    this.setState({ dealerCards: dealerHand });
    this.calculateDealerScore(dealerHand);
  };

  calculateScore = (cards) => {
    return cards.reduce((total, card) => total + card.value, 0);
  };

  calculatePlayerScore = (cards) => {
    const score = this.calculateScore(cards);
    this.setState({ playerScore: score });
    if (score > 21) {
      alert('Player Busted');
    }
  };

  calculateDealerScore = (cards) => {
    const score = this.calculateScore(cards);
    this.setState({ dealerScore: score });
    if (score > 21) {
      alert('Dealer Busted');
    }
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.resetGame}>Reiniciar</button>
          <div>
            <h2>Dealer Score: {this.state.dealerScore}</h2>
            {this.state.dealerCards.map((card, index) => (
              <img
                key={index}
                src={`./assets/PNG/${index !== 1 || this.state.showDealerFirstCard || card.value !== 0 ? card.name : 'back.png'}`}
                alt={card.name}
                style={{ width: '100px', height: '150px' }} // Establece el ancho y alto fijo
              />
            ))}

            <div>
              <button onClick={this.handleDealerHit}>Hit</button>
            </div>
          </div>
          <div>
            <h2>Player Score: {this.state.playerScore}</h2>
            {this.state.playerCards.map((card, index) => (
              <img
                key={index}
                src={`./assets/PNG/${card.name}`}
                alt={card.name}
                style={{ width: '100px', height: '150px' }} // Establece el ancho y alto fijo
              />
            ))}
            <div>
              <button onClick={this.handleHit}>Hit</button>
              <button onClick={this.handleStand}>Stand</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;