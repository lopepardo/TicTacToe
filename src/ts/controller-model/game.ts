// Interfaces
import { IDisplay } from "../interfaces/IDisplay";
import { IPlayer } from "../interfaces/IPlayer";
import { IScore } from "../interfaces/IScore";
// AI
import { AI } from "./AI";
// Constants
import { WINNING_PATTERNS } from "../constants/constants";

/**
 * Class representing the game.
 */
export class Game {
  /**
   * The game's user interface (UI).
   */
  private display: IDisplay;
  /**
   * The game board matrix.
   */
  private board: Array<Array<string>>;
  /**
   * The players of the game.
   */
  private players: IPlayer;
  /**
   * The waiting time in milliseconds before starting a new game.
   */
  private wait: number;
  /**
   * The waiting time in milliseconds before the AI makes its next move.
   */
  private waitAIPlay: number;
  /**
   * Indicates whether a move is being awaited from a player or from the AI.
   */
  private isWaiting: boolean;
  /**
   * Indicates whether a game is currently being played.
   */
  private isPlaying: boolean;
  /**
   * Indicates whether the AI is currently playing a game.
   */
  private isAIPlaying: boolean;
  /**
   * Indicates whether the game is for multiple players.
   */
  private isMultiplayer: boolean;
  /**
   * Scores of the players.
   */
  private score: IScore;
  /**
   * Indicates the current player.
   */
  private currentPlayer: string;
  /**
   * The AI instance used for making moves.
   */
  private AI: AI;

  /**
   * Create a new game instance.
   * @param display The game's user interface (UI) to be used for display.
   */
  constructor(display: IDisplay) {
    this.display = display;
    this.board = this.createBoard();
    this.players = { x: "x", o: "o" };
    this.wait = 1500;
    this.waitAIPlay = 300;
    this.isWaiting = false;
    this.isPlaying = false;
    this.isAIPlaying = false;
    this.isMultiplayer = false;
    this.score = { x: 0, o: 0 };

    this.currentPlayer = this.players.x;
    this.AI = new AI();
  }

  /**
   * Event handler that is triggered when the game mode is switched (1 player or 2 players).
   * @param checked Indicates if the game mode has been marked for multiple players.
   */
  private toggleClickHandle = (checked: boolean) => {
    if (!this.isPlaying) {
      this.isMultiplayer = checked;
    }
  };

  /**
   * Event handler that is triggered when a cell on the board is clicked.
   * @param row The clicked row.
   * @param col The clicked column.
   */
  private playClickHandle = (row: number, col: number) => {
    this.changeToggle(true);
    if (this.board[row][col] || this.isWaiting) return;

    this.board[row][col] = this.currentPlayer;
    this.display.updateBoard(row, col, this.currentPlayer);

    if (this.isGameWon()) {
      this.increaseScore();
      this.display.updateScore(this.score, this.currentPlayer);
      this.gameOver(this.currentPlayer);
      return;
    }

    const isStalemate = this.board.every((row) => row.every((col) => col));
    if (isStalemate) {
      this.gameOver();
      return;
    }

    // Multiplayer
    if (this.isMultiplayer) {
      this.switchPlayer();
    }
    // AI plays
    else {
      this.switchPlayer();
      if (this.isAIPlaying) {
        this.isAIPlaying = false;
      } else {
        this.isAIPlaying = true;
        this.isWaiting = true;
        setTimeout(() => {
          this.isWaiting = false;
          const [AIMoveRow, AIMoveCol] = this.AI.selectNextPlay(this.board);
          this.display.clickHandleAI(AIMoveRow, AIMoveCol);
        }, this.waitAIPlay);
      }
    }
  };

  /**
   * Shows the end-of-game message and resets the board.
   * @param winner - The winning player of the game.
   */
  private gameOver = (winner?: string) => {
    this.isWaiting = true;
    this.display.printGameOver(winner);

    setTimeout(() => {
      this.resetBoard();
      this.isWaiting = false;
      this.isAIPlaying = false;
      this.currentPlayer = this.players.x;
      this.display.clearBoard(this.players.x);
      this.changeToggle(false);
      this.display.cleanGameOver();
    }, this.wait);
  };

  /**
   * Toggles the game switch status and prevents switching to a different game while in play.
   * @param checked - Specifies whether the game is in progress.
   */
  private changeToggle = (checked: boolean) => {
    this.isPlaying = checked;
    this.display.disableToggle(checked);
  };

  /**
   * Generates the empty game board.
   * @returns An empty game board array.
   */
  private createBoard = (): Array<Array<string>> => [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  /**
   * Restores the game board to its original state.
   */
  private resetBoard = (): void => {
    this.board = this.createBoard();
  };

  /**
   * Verifies if the current player has won the game.
   * @returns True if the current player has won the game, otherwise False.
   */
  private isGameWon = (): boolean => {
    const winner = WINNING_PATTERNS.some(
      ([a, b, c]) =>
        this.board[Math.floor(a / 3)][a % 3] === this.currentPlayer &&
        this.board[Math.floor(b / 3)][b % 3] === this.currentPlayer &&
        this.board[Math.floor(c / 3)][c % 3] === this.currentPlayer
    );
    return winner;
  };

  /**
   * Switches the turn of the current player
   */
  private switchPlayer = (): void => {
    this.currentPlayer =
      this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  };

  /**
   * Increases the score of the current player
   */
  private increaseScore = (): void => {
    this.score[this.currentPlayer] += 1;
  };

  /**
   * Start the game and set up event handlers for the user interface.
   */
  public startGame(): void {
    this.display.printBoard(this.board, this.currentPlayer);
    this.display.printScoreBoard(this.score);
    this.display.bindHandlerToggle(this.toggleClickHandle);
    this.display.bindHandlerClick(this.playClickHandle);
  }
}
