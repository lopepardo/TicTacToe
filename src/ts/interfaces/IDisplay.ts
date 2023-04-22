import { IScore } from "./IScore";
import { IScoreMap } from "./IScoreMap";

/**
 * Interface that defines the functions to display and update the game board and scores.
 */
export interface IDisplay {
  // -------------- Board --------------

  /**
   * Print the board on the screen
   * @param boardData - Board data.
   * @param currentPlayer - Symbol of the current player.
   */
  printBoard(boardData: Array<Array<string>>, currentPlayer: string): void;

  /**
   * Update the board with the symbol of the current player in the indicated cell.
   * @param row - Index of the row.
   * @param col - Index of the column.
   * @param currentPlayer - Current player's symbol.
   */
  updateBoard(row: number, col: number, currentPlayer: string): void;

  /**
   * Clear the board to start a new game.
   * @param currentPlayer - Current player's symbol.
   */
  clearBoard(currentPlayer: string): void;

  // -------------- Score --------------

  /**
   * Prints the score of each player on the screen.
   * @param scoreData - Scoring of each player.
   */
  printScoreBoard(scoreData: IScoreMap): void;

  /**
   * Updates a player's score on the screen.
   * @param currentScore - Current score of each player.
   * @param currentPlayer - Current player's symbol.
   */
  updateScore(currentScore: IScore, currentPlayer: string): void;

  // -------------- Game over --------------

  /**
   * Prints the end of game message on the screen.
   * @param winner - Winning player symbol.
   */
  printGameOver(winner?: string): void;

  /**
   * Clears the end of game message from the screen.
   */
  cleanGameOver(): void;

  // -------------- Toggle --------------

  /**
   * Assigns an event handler to the "multiplayer" button.
   * @param clickHandler - Function that handles the button click event.
   */
  bindHandlerToggle(clickEvent: (checked: boolean) => void): void;

  /**
   * Disable the "multiplayer" button.
   * @param checked - Boolean value indicating whether the button is enabled or disabled.
   */
  disableToggle(checked: boolean): void;

  // -------------- Click & AI Click --------------

  /**
   * Assigns an event handler to the game cells.
   * @param clickHandler - Function that handles the click event in the cells.
   */
  bindHandlerClick(clickEvent: (row: number, col: number) => void): void;

  /**
   * Handle AI play.
   * @param row - Row selected by the AI.
   * @param col - Column selected by the AI.
   */
  clickHandleAI(row: number, col: number): void;
}
