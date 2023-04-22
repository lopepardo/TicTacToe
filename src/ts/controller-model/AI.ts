// Interfaces
import { IScoreMap } from "../interfaces/IScoreMap";
// Constants
import { WINNING_PATTERNS } from "../constants/constants";

/**
 * Class representing the game's AI (Artificial Intelligence)
 */
export class AI {
  /**
   * Minimax algorithm to find the best move.
   * @param board - Game board.
   * @param maximizingPlayer - Indicates whether the maximizing player is the AI.
   * @returns The move with the best score.
   */
  private minimax(
    board: Array<Array<string>>,
    maximizingPlayer: boolean
  ): {
    score: number;
    move: number[];
  } {
    const winner = this.checkWinner(board);
    const scoreMap: IScoreMap = {
      o: 10, // AI wins
      x: -10, // Opponent wins
      draw: 0, // Draw
    };
    if (winner !== null) {
      const score = scoreMap[winner];
      return { score, move: [-1, -1] };
    }

    const scoresMoves: [number, number[]][] = [];
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === "") {
          const boardCopy = board.map((r) => [...r]);
          boardCopy[i][j] = maximizingPlayer ? "o" : "x";
          const score = this.minimax(boardCopy, !maximizingPlayer).score;
          scoresMoves.push([score, [i, j]]);
        }
      });
    });
    const scores = scoresMoves.map(([score, _]) => score);
    const moves = scoresMoves.map(([_, move]) => move);

    const bestScoreIndex = maximizingPlayer
      ? scores.reduce((iMax, score, i) => (score > scores[iMax] ? i : iMax), 0)
      : scores.reduce((iMin, score, i) => (score < scores[iMin] ? i : iMin), 0);

    const move = moves[bestScoreIndex];
    return { score: scores[bestScoreIndex], move };
  }

  /**
   * Check if there is a winner in the game.
   * @param board - Game board
   * @returns "o" or "x" if there is a winner, "draw" if it's a tie, or "null" if there is no winner.
   */
  private checkWinner = (board: Array<Array<string>>): string | null => {
    let win: string | null = null;
    WINNING_PATTERNS.forEach(([a, b, c]) => {
      if (
        board[Math.floor(a / 3)][a % 3] &&
        board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
        board[Math.floor(b / 3)][b % 3] === board[Math.floor(c / 3)][c % 3]
      ) {
        win = board[Math.floor(a / 3)][a % 3];
      }
    });
    if (win) return win;

    const isBoardFull = board.every((row) => row.every((col) => col !== ""));
    if (isBoardFull) return "draw";

    return null;
  };

  /**
   * Selects the next move for the AI.
   * @param board - Game board.
   * @returns The coordinates of the selected cell [row, column].
   */
  public selectNextPlay(board: Array<Array<string>>): number[] {
    const result = this.minimax(board, true);
    return result.move;
  }
}
