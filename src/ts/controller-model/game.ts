// Interfaces
import { IDisplay } from "../interfaces/IDisplay";
import { IPlayer } from "../interfaces/IPlayer";
import { IScore } from "../interfaces/IScore";
// AI
import { AI } from "./AI";
// Constants
import { WINNING_PATTERNS } from "../constants/constants";

export class Game {
  private display: IDisplay;
  private board: Array<Array<string>>;
  private players: IPlayer;
  private wait: number;
  private waitAIPlay: number;
  private isWaiting: boolean;
  private isPlaying: boolean;
  private isAIPlaying: boolean;
  private isMultiplayer: boolean;
  private score: IScore;
  private currentPlayer: string;
  private AI: AI;

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

  private toggleClickHandle = (checked: boolean) => {
    if (!this.isPlaying) {
      this.isMultiplayer = checked;
    }
  };

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

  private changeToggle = (checked: boolean) => {
    this.isPlaying = checked;
    this.display.disableToggle(checked);
  };

  private createBoard = (): Array<Array<string>> => [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  private resetBoard = (): void => {
    this.board = this.createBoard();
  };

  private isGameWon = (): boolean => {
    const winner = WINNING_PATTERNS.some(
      ([a, b, c]) =>
        this.board[Math.floor(a / 3)][a % 3] === this.currentPlayer &&
        this.board[Math.floor(b / 3)][b % 3] === this.currentPlayer &&
        this.board[Math.floor(c / 3)][c % 3] === this.currentPlayer
    );
    return winner;
  };

  private switchPlayer = (): void => {
    this.currentPlayer =
      this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  };

  private increaseScore = (): void => {
    this.score[this.currentPlayer] += 1;
  };

  public startGame(): void {
    this.display.printBoard(this.board, this.currentPlayer);
    this.display.printScoreBoard(this.score);
    this.display.bindHandlerToggle(this.toggleClickHandle);
    this.display.bindHandlerClick(this.playClickHandle);
  }
}
