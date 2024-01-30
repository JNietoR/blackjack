import React from 'react';
import './input.css';

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
      dealerScore: 0,
      showReset:false,
    };
  }

  componentDidMount() {
    this.resetGame();
  };

  resetGame = () => {
    const showReset = false;
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
    // elimina la carta oculta del dealer y agrega una en su lugar con valor ya que la oculta vale 0
    if (dealerHand.some(card => card.value === 0)) {
      dealerHand = dealerHand.slice(0, 1).concat(dealerHand.slice(2));
      const card = this.state.shuffledDeck.pop();
      dealerHand = [...dealerHand, card];
    }
    // Roba cartas mientras el score del dealer sea inferior a 17
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
      this.setState({showReset:true});
    }
  };

  calculateDealerScore = (cards) => {
    const score = this.calculateScore(cards);
    this.setState({ dealerScore: score });
    if (score > 21) {
      alert('Dealer Busted');
      this.setState({showReset:true});
    }
  };

  render() {
    const { showReset } = this.state;
    return (
      
      <div className="w-3/4 m-auto mt-8">
        <div className="bg-green-600 border-8 rounded border-amber-950 border-double">
        {showReset && (
          <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={this.resetGame}>Reiniciar</button>
        )}
          <div>
            <h2 className="text-center font-bold">Dealer Score: {this.state.dealerScore}</h2>
            <div className="flex flex-row justify-center">
              {this.state.dealerCards.map((card, index) => (
                <img 
                  className="m-2"
                  key={index}
                  src={`./assets/PNG/${index !== 1 || this.state.showDealerFirstCard || card.value !== 0 ? card.name : 'back.png'}`}
                  alt={card.name}
                  style={{ width: '100px', height: '150px' }} // Establece el ancho y alto fijo
                />
              ))}
            </div>


            <div className="flex justify-center">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={this.handleDealerHit}>Hit</button>
            </div>
          </div>
          <div>
            <h2 className="text-center font-bold">Player Score: {this.state.playerScore}</h2>
            <div className="flex flex-row justify-center">
              {this.state.playerCards.map((card, index) => (
                <img 
                  className="m-2"
                  key={index}
                  src={`./assets/PNG/${card.name}`}
                  alt={card.name}
                  style={{ width: '100px', height: '150px' }} // Establece el ancho y alto fijo
                />
              ))}
            </div>

            <div className="flex justify-center">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={this.handleHit}>Hit</button>
              <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={this.handleStand}>Stand</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;