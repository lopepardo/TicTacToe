import { Game } from "./controller-model/game";
import { Display } from "./view/display";

import "../scss/style.scss";

// ----------- Start Game -----------
const game = new Game(new Display());
game.startGame();
