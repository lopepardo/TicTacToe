// Clase interfaz que se encarga de dibujar y mostrar en pantalla
export class Interfaz {
  // Esta clase se inicializa con un objeto estado que lleva el registro de juego
  constructor(state) {
    this.state = state;
  }

  // Función que dibuja el puntaje del jugador en pantalla
  drawScore(player) {
    document.getElementById(`player${player.symbol}`).textContent =
      player.score;
  }

  // Función que dibuja el movimiento del jugador en pantalla
  drawMove(box, symbol) {
    if (box.className != "select") {
      box.firstElementChild.textContent = symbol;
      // llama a la función "setMove" del objeto estado, para almacenar la jugada realizada
      this.state.setMove(box, symbol);
    }
  }

  // Función que reinicia el estado el tablero
  resetBoard(board) {
    const selectList = [...board.children];
    selectList.forEach((select) => {
      select.firstElementChild.textContent = "";
      select.classList.add("box");
    });
    // llama a la función "resetMoves" del objeto estado, para reiniciar el registro
    this.state.resetMoves();
  }

  // Función que añade la clase "win" a los simbolos del jugador ganador
  // Cuando hay un empate, añade la clase "win" a todos los simbolos
  blinkWin(indicesWin = []) {
    if (!indicesWin.length) {
      for (let i = 0; i < 9; i++) {
        const box = document.getElementById(`${i}`);
        box.firstElementChild.classList.toggle("win");
      }
    } else {
      indicesWin.forEach((ind) => {
        const box = document.getElementById(`${ind}`);
        box.firstElementChild.classList.toggle("win");
      });
    }
  }

  // Función que muestra que jugador tiene el turno en pantalla
  symbolTurn(playerX, playerO) {
    const turnSymbol = document.getElementById("turn-symbol");
    if (playerX.turn === true) {
      turnSymbol.textContent = playerX.symbol;
    } else if (playerO.turn === true) {
      turnSymbol.textContent = playerO.symbol;
    }
  }
}
