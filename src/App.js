import logo from './logo.svg';
import './App.css';

// Crear un array de cartas con sus valores
const mapaBaraja = {
  "2 de Corazones": 2,
  "3 de Corazones": 3,
  "4 de Corazones": 4,
  "5 de Corazones": 5,
  "6 de Corazones": 6,
  "7 de Corazones": 7,
  "8 de Corazones": 8,
  "9 de Corazones": 9,
  "10 de Corazones": 10,
  "J de Corazones": 10,
  "Q de Corazones": 10,
  "K de Corazones": 10,
  "A de Corazones": 11,
  "2 de Diamantes": 2,
  "3 de Diamantes": 3,
  "4 de Diamantes": 4,
  "5 de Diamantes": 5,
  "6 de Diamantes": 6,
  "7 de Diamantes": 7,
  "8 de Diamantes": 8,
  "9 de Diamantes": 9,
  "10 de Diamantes": 10,
  "J de Diamantes": 10,
  "Q de Diamantes": 10,
  "K de Diamantes": 10,
  "A de Diamantes": 11,
  "2 de Tréboles": 2,
  "3 de Tréboles": 3,
  "4 de Tréboles": 4,
  "5 de Tréboles": 5,
  "6 de Tréboles": 6,
  "7 de Tréboles": 7,
  "8 de Tréboles": 8,
  "9 de Tréboles": 9,
  "10 de Tréboles": 10,
  "J de Tréboles": 10,
  "Q de Tréboles": 10,
  "K de Tréboles": 10,
  "A de Tréboles": 11,
  "2 de Picas": 2,
  "3 de Picas": 3,
  "4 de Picas": 4,
  "5 de Picas": 5,
  "6 de Picas": 6,
  "7 de Picas": 7,
  "8 de Picas": 8,
  "9 de Picas": 9,
  "10 de Picas": 10,
  "J de Picas": 10,
  "Q de Picas": 10,
  "K de Picas": 10,
  "A de Picas": 11
};

/*
function sacarCartaAleatoria() {
  const cartasRestantes = Object.keys(mapaBaraja);

  if (cartasRestantes.length === 0) {
    console.log("La baraja está vacía.");
    return null;
  }

  // Obtener un índice aleatorio
  const indiceAleatorio = Math.floor(Math.random() * cartasRestantes.length);

  // Obtener la carta correspondiente al índice aleatorio
  const cartaAleatoria = cartasRestantes[indiceAleatorio];

  // Obtener el valor de la carta
  const valorCartaAleatoria = mapaBaraja[cartaAleatoria];

  // Eliminar la carta del mapa
  delete mapaBaraja[cartaAleatoria];

  // Devolver la carta sacada
  return { nombre: cartaAleatoria, valor: valorCartaAleatoria };
}

// Ejemplo de uso
const cartaSacada = sacarCartaAleatoria();
if (cartaSacada) {
  console.log("Has sacado la carta:", cartaSacada.nombre);
  console.log("El valor de la carta es:", cartaSacada.valor);
} else {
  console.log("La baraja está vacía.");
}

*/



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
