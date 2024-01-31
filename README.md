
# BlackJack

Proyecto de clase para hacer un BlackJack. Según las normas del profesor.

Reglas del juego:

   - Cada ronda se juega con una baraja inglesa barajada de forma aleatoria de 52 cartas sin comodines.
        Debes simular la baraja y barajarla aleatoriamente. 
   - Cada carta numerada del 2 al 10 (2, 3, 4, 5, 6, 7, 8, 9, 10) tendrá un valor idéntico a su valor numérico
   - Las figuras (Jotas, Reinas y Reyes) valen todas 10 puntos.
   - Los Ases valen 11 puntos.
   - El crupier reparte una carta al jugador y dos cartas a sí mismo (una bocabajo).
   - El jugador solicita cartas hasta plantarse.
   - Una vez que el jugador se ha plantado, el crupier descubre la primera carta y se reparte cartas mientras su mano sume menos de 17.
   - Si alguno se pasa de 21, pierde automáticamente.
   - Si no se pasa ninguno, gana el jugador que se acerque más a 21.

Cómo debe ser la interfaz:

   - Dos filas en las que aparezcan las cartas de los jugadores (Una fila para el crupier y otra fila para el jugador).
   - Las cartas deben mostrar el número y el palo (Picas, Corazones, Rombos y Tréboles) sobre un fondo blanco.
   -  El tablero debe ser verde.
   - Botón para solicitar siguiente carta.
   - Botón para solicitar siguiente carta Crupier.
   - Botón para plantarse.
   - Botón para nueva ronda (solo debe de aparecer al terminar una ronda).
   - Muestra por pantalla en directo la suma de las cartas de cada jugador.





## Installation

Para ejecutar este proyecto primero clona el repositorio

```bash
  git clone https://github.com/JNietoR/blackjack.git
```
Entra en el directorio del proyecto.

```bash
cd ./blackjack
```
Una vez dentro del directorio del proyecto, instala todas las dependecias.

```bash
  npm install
```
Una vez hecho esto inicia el servidor de desarrollo local. 
```bash
  npm start
```

## Tech Stack

En este proyecto he usado Reacty y TailwindCSS para aplicar estilos.

https://es.react.dev/learn/installation

https://tailwindcss.com/docs/installation
## Demo en Vercel

https://blackjack-react-tailwindcss.vercel.app/

