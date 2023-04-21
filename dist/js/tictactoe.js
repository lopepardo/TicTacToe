"use strict";
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
class DOMUtils {
}
DOMUtils.createElement = (tag, className, dataset) => {
    const element = document.createElement(tag);
    if (className)
        element.classList.add(className);
    if (dataset)
        element.dataset[dataset[0]] = dataset[1];
    return element;
};
DOMUtils.getElement = (selector) => {
    return document.querySelector(selector);
};
DOMUtils.getAllElements = (selector) => {
    return document.querySelectorAll(selector);
};
class Display {
    constructor() {
        this.printBoard = (boardData, currentPlayer) => {
            const gameTitle = DOMUtils.createElement("h1", "game_title");
            gameTitle.textContent = "Tic Tac Toe";
            const gameToggle = DOMUtils.createElement("label", "toggle");
            const toggleTitle = DOMUtils.createElement("h2", "toggle_title");
            toggleTitle.textContent = "Multijugador:";
            const toggleWrap = DOMUtils.createElement("div", "toggle_wrap");
            const toggleInput = DOMUtils.createElement("input", "");
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
            DOMUtils.getElement("#game").append(gameTitle, gameToggle, gameTurn, gameBoard);
        };
        this.updateBoard = (row, col, currentPlayer) => {
            const turn = DOMUtils.getElement("#turn");
            turn.textContent = currentPlayer === "x" ? "o" : "x";
            const playerCell = DOMUtils.createElement("span", currentPlayer);
            playerCell.textContent = currentPlayer;
            const boardRow = DOMUtils.getElement(`[data-row="${row}"] [data-col="${col}"]`);
            boardRow.append(playerCell);
        };
        this.clearBoard = (currentPlayer) => {
            const turn = DOMUtils.getElement("#turn");
            turn.textContent = currentPlayer;
            const cells = DOMUtils.getAllElements(".col");
            cells.forEach((cell) => {
                cell.textContent = "";
            });
        };
        this.printScoreBoard = (scoreData) => {
            const scoreBoard = DOMUtils.createElement("div", "game_score");
            const scoreTitle = DOMUtils.createElement("h2", "game_score-title");
            scoreTitle.textContent = "Puntaje:";
            const score = DOMUtils.createElement("div", "game_score-display");
            const createPlayerScore = (player, score) => {
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
        this.updateScore = (currentScore, currentPlayer) => {
            const currentPlayerScore = DOMUtils.getElement(`#score-${currentPlayer}`);
            const score = currentScore[currentPlayer];
            currentPlayerScore.textContent = `${score}`;
        };
        this.printGameOver = (winner) => {
            const gameOver = DOMUtils.createElement("div", "overlay");
            const title = DOMUtils.createElement("h1", "overlay_title");
            title.textContent = "Game Over";
            if (winner) {
                const subtitle = DOMUtils.createElement("span", "overlay_subtitle");
                subtitle.textContent = `${winner.toUpperCase()} ha ganado`;
                const container = DOMUtils.createElement("div", "overlay_container");
                container.append(title, subtitle);
                gameOver.append(container);
            }
            else {
                gameOver.append(title);
            }
            DOMUtils.getElement("#game").append(gameOver);
        };
        this.cleanGameOver = () => {
            const gameOver = DOMUtils.getElement(".overlay");
            gameOver.remove();
        };
        this.bindHandlerToggle = (clickHandler) => {
            const toggle = DOMUtils.getElement("#isMultiplayer");
            toggle.addEventListener("change", (event) => {
                const eventInput = event.target;
                const checked = eventInput.checked;
                clickHandler(checked);
            });
        };
        this.clickHandleAI = (row, col) => {
            const cellElements = DOMUtils.getAllElements(".col");
            const selectedCell = row * 3 + col;
            const selectedElement = cellElements[selectedCell];
            selectedElement.click();
        };
    }
    disableToggle(checked) {
        const toggle = DOMUtils.getElement("#isMultiplayer");
        toggle.disabled = checked;
    }
    bindHandlerClick(clickHandler) {
        const cells = DOMUtils.getAllElements(".col");
        cells.forEach((cell) => {
            cell.addEventListener("click", (event) => {
                const el = event.target;
                const row = Number(el.parentElement.dataset.row);
                const col = Number(el.dataset.col);
                clickHandler(row, col);
            });
        });
    }
}
class AI {
    constructor() {
        this.checkWinner = (board) => {
            let win = null;
            winningPatterns.forEach(([a, b, c]) => {
                if (board[Math.floor(a / 3)][a % 3] &&
                    board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
                    board[Math.floor(b / 3)][b % 3] === board[Math.floor(c / 3)][c % 3]) {
                    win = board[Math.floor(a / 3)][a % 3];
                }
            });
            if (win)
                return win;
            const isBoardFull = board.every((row) => row.every((col) => col !== ""));
            if (isBoardFull)
                return "draw";
            return null;
        };
    }
    minimax(board, maximizingPlayer) {
        const winner = this.checkWinner(board);
        const scoreMap = {
            o: 10,
            x: -10,
            draw: 0,
        };
        if (winner !== null) {
            const score = scoreMap[winner];
            return { score, move: [-1, -1] };
        }
        const scoresMoves = [];
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
    selectNextPlay(board) {
        const result = this.minimax(board, true);
        return result.move;
    }
}
class Game {
    constructor(display) {
        this.toggleClickHandle = (checked) => {
            if (!this.isPlaying) {
                this.isMultiplayer = checked;
            }
        };
        this.playClickHandle = (row, col) => {
            this.changeToggle(true);
            if (this.board[row][col] || this.isWaiting)
                return;
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
            if (this.isMultiplayer) {
                this.switchPlayer();
            }
            else {
                this.switchPlayer();
                if (this.isAIPlaying) {
                    this.isAIPlaying = false;
                }
                else {
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
        this.gameOver = (winner) => {
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
        this.changeToggle = (checked) => {
            this.isPlaying = checked;
            this.display.disableToggle(checked);
        };
        this.createBoard = () => [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.resetBoard = () => {
            this.board = this.createBoard();
        };
        this.isGameWon = () => {
            const winner = winningPatterns.some(([a, b, c]) => this.board[Math.floor(a / 3)][a % 3] === this.currentPlayer &&
                this.board[Math.floor(b / 3)][b % 3] === this.currentPlayer &&
                this.board[Math.floor(c / 3)][c % 3] === this.currentPlayer);
            return winner;
        };
        this.switchPlayer = () => {
            this.currentPlayer =
                this.currentPlayer === this.players.x ? this.players.o : this.players.x;
        };
        this.increaseScore = () => {
            this.score[this.currentPlayer] += 1;
        };
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
    startGame() {
        this.display.printBoard(this.board, this.currentPlayer);
        this.display.printScoreBoard(this.score);
        this.display.bindHandlerToggle(this.toggleClickHandle);
        this.display.bindHandlerClick(this.playClickHandle);
    }
}
const game = new Game(new Display());
game.startGame();
