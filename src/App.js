import React from 'react';
import './input.css';
import './App.css';

// Array que representa una baraja de cartas con nombres y valores
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

// Función para barajar la baraja usando el algoritmo de barajado Fisher-Yates
function shuffleDeck(deck) {
  // Crea una copia del deck para evitar perder el deck original
  const shuffledDeck = [...deck];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
}

// Constructor para inicializar el estado del componente
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
      showReset: false,
    };
  }

  // Método del ciclo de vida para reiniciar el juego cuando el componente se monta
  componentDidMount() {
    this.resetGame();
  };

  // Función para restablecer el estado del juego
  resetGame = () => {
    this.setState({ showReset: false });
    const initialDeck = shuffleDeck([...deckInicial]);
    this.setState({ shuffledDeck: initialDeck });

    // Hace pop de la baraja para el jugador, establece el estado de las cartas iniciales del jugador y calcula el score inicial segun esta carta
    const initialPlayerCards = [initialDeck.pop()];
    this.setState({ playerCards: initialPlayerCards });
    this.calculatePlayerScore(initialPlayerCards);

    // Roba cartas del dealer una normal(pop) y otra oculta con valor 0 que despues cambiaremos por otra, establece el estado de las cartas iniciales del dealer y calcula el score inicial segun estas cartas
    const initialDealerCards = [initialDeck.pop(), { name: 'back.png', value: 0 }];
    this.setState({ dealerCards: initialDealerCards });
    this.calculateDealerScore(initialDealerCards);
  };

  // Función para manejar cuando el jugador hace clic en el botón "Hit", primero saca una carta luego la agrega a la mano calculando el nuevo estado y calcula la nueva puntuación según estas cartas
  handleHit = () => {
    const card = this.state.shuffledDeck.pop();
    this.setState({ hitCard: card });
    this.setState({ playerCards: [...this.state.playerCards, card] });
    this.calculatePlayerScore([...this.state.playerCards, card]);
  };

  // Función para manejar cuando se utiliza el boton hit del crupier, se saca carta se agrega carta a su mano catualizando su estado y luego calculara el nuevo score actualizando su estado
  handleDealerHit = () => {
    const card = this.state.shuffledDeck.pop();
    this.setState({ hitCard: card });
    this.setState({ dealerCards: [...this.state.dealerCards, card] });
    this.calculateDealerScore([...this.state.dealerCards, card]);
  };

  // Función para manejar cuando el jugador hace click en el botón "Stand" y se planta
  handleStand = () => {
    //Se cambia el estado para que se muestre la carta oculta del dealer
    this.setState({ showDealerFirstCard: true });
    //copia de la mano del dealer
    let dealerHand = [...this.state.dealerCards];
    // elimina la carta oculta del dealer y agrega una en su lugar con valor ya que la oculta valía 0
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
    //actualiza la mano del dealer, calcula el score del dealer y muestra el botón de reset al terminar la partida cuando te plantas
    this.setState({ dealerCards: dealerHand });
    this.calculateDealerScore(dealerHand);
    this.setState({ showReset: true });
  };

  // función para calcular el score de una mano
  calculateScore = (cards) => {
    return cards.reduce((total, card) => total + card.value, 0);
  };

  // Calcula la puntuación del jugador y cambia el estado de la partida si se pasa de 21
  calculatePlayerScore = (cards) => {
    const score = this.calculateScore(cards);
    this.setState({ playerScore: score });
    if (score > 21) {
      this.setState({ showReset: true });
    }
  };

  // Calcula la puntuación del dealer y cambia el estado de la partida si se pasa de 21
  calculateDealerScore = (cards) => {
    const score = this.calculateScore(cards);
    this.setState({ dealerScore: score });
    if (score > 21) {
      this.setState({ showReset: true });
    }
  };

  // función para calcular quien gana la partida
  calculateWinner = () => {
    if (this.state.playerScore < 21 && this.state.dealerScore > 21) {
      return "Dealer Busted Player Wins";
    } else if (this.state.dealerScore < 21 && this.state.playerScore > 21) {
      return "Player Busted Dealer wins";
    } else {
      if (this.state.dealerScore === this.state.playerScore) {
        return "It's a tie";
      } else if (this.state.dealerScore > this.state.playerScore) {
        return "Dealer Wins";
      } else {
        return "Player Wins";
      }
    }
  };

  // Método para renderizar la interfaz del juego
  render() {
    // Desestructura las propiedades del estado
    const { showReset } = this.state;
    // Calcula al ganador del juego
    const winner = this.calculateWinner();

    return (
      <div className="lg:w-2/4 m-auto my-36">

        {/* Contenedor principal del juego */}
        <div className="text-center border-8 rounded-2xl border-amber-950 border-double mesa">

          {/* Sección para mostrar el resultado del juego y el botón de reinicio */}
          {showReset && (
            <div className="m-auto mt-8 flex flex-wrap justify-center">
              <div className="text-center bg-green-600 border-8 rounded border-amber-950 border-double">
                {/* Muestra el mensaje del ganador */}
                <h2 className="text-center font-bold">{winner}</h2>
                {/* Botón de reinicio */}
                <button
                  className="font-bold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  onClick={this.resetGame}
                >
                  Reiniciar
                </button>
              </div>
            </div>
          )}

          {/* Sección para mostrar la puntuación y las cartas del crupier */}
          <div className="mt-4">
            <h2 className="text-center font-bold">Dealer Score: {this.state.dealerScore}</h2>

            <div className="flex flex-row justify-center flex-wrap">
              {/* Mapea y muestra las cartas del crupier */}
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

            {/* Botón de "Hit" para el crupier */}
            <div className="flex justify-center">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={this.handleDealerHit}
              >
                Hit
              </button>
            </div>
          </div>

          {/* Sección para mostrar la puntuación y las cartas del jugador */}
          <div className="mb-4">
            <h2 className="text-center font-bold">Player Score: {this.state.playerScore}</h2>

            <div className="flex flex-row justify-center flex-wrap">
              {/* Mapea y muestra las cartas del jugador */}
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

            {/* Botones de "Hit" y "Stand" para el jugador */}
            <div className="flex justify-center">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={this.handleHit}
              >
                Hit
              </button>
              <button
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={this.handleStand}
              >
                Stand
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default App;