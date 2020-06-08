// Clase jugador que se encarga de llevar el registro del jugador
export class Player {
  // Esta clase se inicializa con tres varibles, el simbolo que representa
  // el jugador, el puntaje, y el turno del jugador
  constructor(symbol, score, turn) {
    this.symbol = symbol;
    this.score = score;
    this.turn = turn;
  }

  // Función que aumenta el puntaje del jugador cuando gana
  setScore() {
    this.score += 1;
  }
}
