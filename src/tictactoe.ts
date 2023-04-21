// ------------------------ Custom Types & contants ------------------------
interface IPlayer {
  x: string;
  o: string;
}
interface IScore {
  x: number;
  o: number;
  [key: string]: number;
}
interface ScoreMap {
  [key: string]: number;
}
interface IDisplay {
  // -------------- Board --------------
  printBoard(boardData: Array<Array<string>>, currentPlayer: string): void;
  updateBoard(row: number, col: number, currentPlayer: string): void;
  clearBoard(currentPlayer: string): void;
  // -------------- Score --------------
  printScoreBoard(scoreData: IScore): void;
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
const winningPatterns = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// ------------------------ DOMUtils ------------------------
class DOMUtils {
  public static createElement = (
    tag: string,
    className?: string,
    dataset?: Array<any>
  ): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (dataset) element.dataset[dataset[0]] = dataset[1];
    return element;
  };

  public static getElement = (selector: string): HTMLElement => {
    return <HTMLElement>document.querySelector(selector);
  };

  public static getAllElements = (selector: string): NodeList => {
    return <NodeList>document.querySelectorAll(selector);
  };
}

// ------------------------ Display ------------------------
class Display implements IDisplay {
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

  public clearBoard = (currentPlayer: string): void => {
    const turn = DOMUtils.getElement("#turn");
    turn.textContent = currentPlayer;

    const cells = DOMUtils.getAllElements(".col");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

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

  public updateScore = (currentScore: IScore, currentPlayer: string): void => {
    const currentPlayerScore = DOMUtils.getElement(`#score-${currentPlayer}`);
    const score = currentScore[currentPlayer];
    currentPlayerScore.textContent = `${score}`;
  };

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

  public cleanGameOver = (): void => {
    const gameOver = DOMUtils.getElement(".overlay");
    gameOver.remove();
  };

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

  public disableToggle(checked: boolean) {
    const toggle = <HTMLInputElement>DOMUtils.getElement("#isMultiplayer");
    toggle.disabled = checked;
  }

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

  public clickHandleAI = (row: number, col: number): void => {
    const cellElements = DOMUtils.getAllElements(".col");
    const selectedCell = row * 3 + col;
    const selectedElement = <HTMLElement>cellElements[selectedCell];
    selectedElement.click();
  };
}

// ------------------------ AI ------------------------
class AI {
  private minimax(
    board: Array<Array<string>>,
    maximizingPlayer: boolean
  ): {
    score: number;
    move: number[];
  } {
    const winner = this.checkWinner(board);
    const scoreMap: ScoreMap = {
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

  private checkWinner = (board: Array<Array<string>>): string | null => {
    let win: string | null = null;
    winningPatterns.forEach(([a, b, c]) => {
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

  public selectNextPlay(board: Array<Array<string>>): number[] {
    const result = this.minimax(board, true);
    return result.move;
  }
}

// ------------------------ Game ------------------------
class Game {
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
    const winner = winningPatterns.some(
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

// ------------------------ Start Game ------------------------
const game = new Game(new Display());
game.startGame();
