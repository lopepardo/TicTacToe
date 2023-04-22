// Interfaces
import { IScore } from "../interfaces/IScore";
import { IDisplay } from "../interfaces/IDisplay";
// Utils
import { DOMUtils } from "../utils/DOM";

/**
 * Class that handles the visual representation of the game.
 */
export class Display implements IDisplay {
  /**
   * Print the board on the screen
   * @param boardData - Board data.
   * @param currentPlayer - Symbol of the current player.
   */
  public printBoard = (
    boardData: Array<Array<string>>,
    currentPlayer: string
  ): void => {
    const gameTitle = DOMUtils.createElement("h1", "game_title");
    gameTitle.textContent = "Tic Tac Toe";

    const gameToggle = DOMUtils.createElement("label", "toggle");
    const toggleTitle = DOMUtils.createElement("h2", "toggle_title");
    toggleTitle.textContent = "Multijugador:";
    const toggleWrap = DOMUtils.createElement("div", "toggle_wrap");
    const toggleInput = <HTMLInputElement>DOMUtils.createElement("input", "");
    toggleInput.type = "checkbox";
    toggleInput.id = "isMultiplayer";
    const toggleSwitch = DOMUtils.createElement("div", "toggle_switch");
    toggleWrap.append(toggleInput, toggleSwitch);
    gameToggle.append(toggleTitle, toggleWrap);

    const gameTurn = DOMUtils.createElement("h2", "game_turn");
    gameTurn.textContent = "Turno: ";
    const symbol = DOMUtils.createElement("span", "game_symbol");
    symbol.id = "turn";
    symbol.textContent = currentPlayer;
    gameTurn.append(symbol);

    const gameBoard = DOMUtils.createElement("div", "game_board");
    boardData.forEach((row, i) => {
      const boardRow = DOMUtils.createElement("div", "row", ["row", i]);
      gameBoard.append(boardRow);
      row.forEach((_, j) => {
        const boardCol = DOMUtils.createElement("div", "col", ["col", j]);
        boardRow.append(boardCol);
      });
    });

    DOMUtils.getElement("#game").append(
      gameTitle,
      gameToggle,
      gameTurn,
      gameBoard
    );
  };

  /**
   * Update the board with the symbol of the current player in the indicated cell.
   * @param row - Index of the row.
   * @param col - Index of the column.
   * @param currentPlayer - Current player's symbol.
   */
  public updateBoard = (
    row: number,
    col: number,
    currentPlayer: string
  ): void => {
    const turn = DOMUtils.getElement("#turn");
    turn.textContent = currentPlayer === "x" ? "o" : "x";

    const playerCell = DOMUtils.createElement("span", currentPlayer);
    playerCell.textContent = currentPlayer;

    const boardRow = DOMUtils.getElement(
      `[data-row="${row}"] [data-col="${col}"]`
    );

    boardRow.append(playerCell);
  };

  /**
   * Clear the board to start a new game.
   * @param currentPlayer - Current player's symbol.
   */
  public clearBoard = (currentPlayer: string): void => {
    const turn = DOMUtils.getElement("#turn");
    turn.textContent = currentPlayer;

    const cells = DOMUtils.getAllElements(".col");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  /**
   * Prints the score of each player on the screen.
   * @param scoreData - Scoring of each player.
   */
  public printScoreBoard = (scoreData: IScore): void => {
    const scoreBoard = DOMUtils.createElement("div", "game_score");

    const scoreTitle = DOMUtils.createElement("h2", "game_score-title");
    scoreTitle.textContent = "Puntaje:";

    const score = DOMUtils.createElement("div", "game_score-display");
    const createPlayerScore = (player: string, score: number) => {
      const playerScore = DOMUtils.createElement("div", player);
      playerScore.textContent = `Jugador ${player} : `;
      const scorePlayer = DOMUtils.createElement("span", "game_score-player");
      scorePlayer.id = `score-${player}`;
      scorePlayer.textContent = `${score}`;
      playerScore.append(scorePlayer);
      return playerScore;
    };
    const playerOneScore = createPlayerScore("x", scoreData.x);
    const playerTwoScore = createPlayerScore("o", scoreData.o);
    score.append(playerOneScore, playerTwoScore);

    scoreBoard.append(scoreTitle, score);
    DOMUtils.getElement("#game").append(scoreBoard);
  };

  /**
   * Updates a player's score on the screen.
   * @param currentScore - Current score of each player.
   * @param currentPlayer - Current player's symbol.
   */
  public updateScore = (currentScore: IScore, currentPlayer: string): void => {
    const currentPlayerScore = DOMUtils.getElement(`#score-${currentPlayer}`);
    const score = currentScore[currentPlayer];
    currentPlayerScore.textContent = `${score}`;
  };

  /**
   * Prints the end of game message on the screen.
   * @param winner - Winning player symbol.
   */
  public printGameOver = (winner: string): void => {
    const gameOver = DOMUtils.createElement("div", "overlay");
    const title = DOMUtils.createElement("h1", "overlay_title");
    title.textContent = "Game Over";
    if (winner) {
      const subtitle = DOMUtils.createElement("span", "overlay_subtitle");
      subtitle.textContent = `${winner.toUpperCase()} ha ganado`;
      const container = DOMUtils.createElement("div", "overlay_container");
      container.append(title, subtitle);
      gameOver.append(container);
    } else {
      gameOver.append(title);
    }
    DOMUtils.getElement("#game").append(gameOver);
  };

  /**
   * Clears the end of game message from the screen.
   */
  public cleanGameOver = (): void => {
    const gameOver = DOMUtils.getElement(".overlay");
    gameOver.remove();
  };

  /**
   * Assigns an event handler to the "multiplayer" button.
   * @param clickHandler - Function that handles the button click event.
   */
  public bindHandlerToggle = (
    clickHandler: (checked: boolean) => void
  ): void => {
    const toggle = <HTMLInputElement>DOMUtils.getElement("#isMultiplayer");
    toggle.addEventListener("change", (event: Event) => {
      const eventInput = <HTMLInputElement>event.target;
      const checked = eventInput.checked;
      clickHandler(checked);
    });
  };

  /**
   * Disable the "multiplayer" button.
   * @param checked - Boolean value indicating whether the button is enabled or disabled.
   */
  public disableToggle(checked: boolean) {
    const toggle = <HTMLInputElement>DOMUtils.getElement("#isMultiplayer");
    toggle.disabled = checked;
  }

  /**
   * Assigns an event handler to the game cells.
   * @param clickHandler - Function that handles the click event in the cells.
   */
  public bindHandlerClick(
    clickHandler: (row: number, col: number) => void
  ): void {
    const cells = DOMUtils.getAllElements(".col");
    cells.forEach((cell) => {
      cell.addEventListener("click", (event: Event) => {
        const el = <HTMLElement>event.target;
        const row: number = Number(el.parentElement!.dataset.row!);
        const col: number = Number(el.dataset.col!);
        clickHandler(row, col);
      });
    });
  }

  /**
   * Handle AI play.
   * @param row - Row selected by the AI.
   * @param col - Column selected by the AI.
   */
  public clickHandleAI = (row: number, col: number): void => {
    const cellElements = DOMUtils.getAllElements(".col");
    const selectedCell = row * 3 + col;
    const selectedElement = <HTMLElement>cellElements[selectedCell];
    selectedElement.click();
  };
}
