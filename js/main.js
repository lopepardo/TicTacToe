// Importación de modulos
import { Interfaz } from "./Interfaz.js";
import { Player } from "./Player.js";
import { State } from "./State.js";

// Intancias de dos jugadores, el estado del juego y la interfaz
const playerX = new Player("X", 0, true);
const playerO = new Player("O", 0, false);
const state = new State("X");
const UI = new Interfaz(state);

// Varibles DOM
const board = document.getElementById("board");

// functions
// Reinicia la interfaz y el estado cuando uno de los jugadores gana
const initialState = (indicesWin) => {
  setTimeout(() => {
    board.classList.remove("disable");
    UI.blinkWin(indicesWin);
    UI.resetBoard(board);
    UI.symbolTurn(playerX, playerO);
  }, 3000);
  state.changeStateGlobal();
};

// Comprueba si el juego queda en un empate
const drawState = () => {
  const selects = document.querySelectorAll(".select");
  if (
    selects[0].textContent.length &&
    selects[1].textContent.length &&
    selects[2].textContent.length &&
    selects[3].textContent.length &&
    selects[4].textContent.length &&
    selects[5].textContent.length &&
    selects[6].textContent.length &&
    selects[7].textContent.length &&
    selects[8].textContent.length
  ) {
    UI.blinkWin();

    setTimeout(() => {
      UI.resetBoard(board);
      UI.blinkWin();
      UI.symbolTurn(playerX, playerO);
    }, 3000);

    state.changeStateGlobal();
  }
};

// Eventlistener
// Evento principal del juego, comprueba el turno del jugador y muestra las jugadas en la interfaz
// Cuando uno de los dos jugadores gana, aumenta el contador de puntos del jugador y reinicia la intefaz
board.addEventListener("mousedown", (e) => {
  if (e.target.classList[1] === "box") {
    if (playerX.turn === true) {
      UI.drawMove(e.target, playerX.symbol);

      const [win, indicesWin] = state.ckeckWin(playerX.symbol);
      if (win) {
        board.classList.add("disable");
        playerX.setScore();
        UI.drawScore(playerX);
        UI.blinkWin(indicesWin);

        if (state.turnGlobal === "X") {
          playerX.turn = false;
          playerO.turn = true;
        }

        initialState(indicesWin);
        return;
      }
    } else if (playerO.turn === true) {
      UI.drawMove(e.target, playerO.symbol);

      const [win, indicesWin] = state.ckeckWin(playerO.symbol);
      if (win) {
        board.classList.add("disable");
        playerO.setScore();
        UI.drawScore(playerO);
        UI.blinkWin(indicesWin);

        if (state.turnGlobal === "O") {
          playerX.turn = true;
          playerO.turn = false;
        }

        initialState(indicesWin);
        return;
      }
    }
    playerX.turn = !playerX.turn;
    playerO.turn = !playerO.turn;

    drawState();
    e.target.classList.remove("box");
  }
});

// Inicializa los puntos de ambos jugadores y la interfaz
document.addEventListener("DOMContentLoaded", () => {
  UI.drawScore(playerX);
  UI.drawScore(playerO);
  UI.resetBoard(board);
  UI.symbolTurn(playerX, playerO);
});
