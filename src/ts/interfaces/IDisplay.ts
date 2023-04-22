import { IScore } from "./IScore";
import { IScoreMap } from "./IScoreMap";

export interface IDisplay {
  // -------------- Board --------------
  printBoard(boardData: Array<Array<string>>, currentPlayer: string): void;
  updateBoard(row: number, col: number, currentPlayer: string): void;
  clearBoard(currentPlayer: string): void;
  // -------------- Score --------------
  printScoreBoard(scoreData: IScoreMap): void;
  updateScore(currentScore: IScore, currentPlayer: string): void;
  // -------------- Game over --------------
  printGameOver(winner?: string): void;
  cleanGameOver(): void;
  // -------------- Toggle --------------
  bindHandlerToggle(clickEvent: (checked: boolean) => void): void;
  disableToggle(checked: boolean): void;
  // -------------- Click & AI Click --------------
  bindHandlerClick(clickEvent: (row: number, col: number) => void): void;
  clickHandleAI(row: number, col: number): void;
}
