// Clase estado que se encarga de llevar el registro del juego actual
export class State {
  // Esta clase se inicializa con dos varibles la simulación del tablero
  // en un arreglo y una varible que registra el turno global de la partida
  constructor(turnGlobal) {
    this.boardMoves = ["", "", "", "", "", "", "", "", ""];
    this.turnGlobal = turnGlobal;
  }

  // Función que escribe las jugadas en la simulación del tablero
  setMove(box, symbol) {
    this.boardMoves[box.id] = symbol;
  }

  // Función que reinicia las jugadas en la simulación del tablero
  resetMoves() {
    for (const i in this.boardMoves) {
      this.boardMoves[i] = "";
    }
  }

  // Función que cambia el turno global de la partida
  changeStateGlobal() {
    this.turnGlobal === "X" ? (this.turnGlobal = "O") : (this.turnGlobal = "X");
  }

  // Función que verifica la igualdad entre dos vectores de difrentes tamaños
  equalVector(arr1, arr2) {
    if (arr1.length < 3) return false;

    let contWin = 0;
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          contWin++;
        }
      }
    }
    return contWin === 3 ? true : false;
  }

  // Función que verifica si uno de los jugadores gana la partida
  ckeckWin(symbol) {
    let win = false;
    let indicesWin = [];

    // Posibilidades en el tablero para ganar
    const possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const stateMap = this.boardMoves.map((s) => s === symbol);
    const indices = stateMap.reduce(
      (out, bool, index) => (bool ? out.concat(index) : out),
      []
    );

    possibilities.forEach((possibility) => {
      if (this.equalVector(indices, possibility)) {
        win = true;
        indicesWin = possibility;
      }
    });
    return [win, indicesWin];
  }
}
