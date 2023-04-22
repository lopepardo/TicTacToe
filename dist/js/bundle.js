(()=>{"use strict";var e={213:(e,t,i)=>{i.r(t)},906:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WINNING_PATTERNS=void 0,t.WINNING_PATTERNS=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]},245:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AI=void 0;const s=i(906);t.AI=class{constructor(){this.checkWinner=e=>{let t=null;return s.WINNING_PATTERNS.forEach((([i,s,a])=>{e[Math.floor(i/3)][i%3]&&e[Math.floor(i/3)][i%3]===e[Math.floor(s/3)][s%3]&&e[Math.floor(s/3)][s%3]===e[Math.floor(a/3)][a%3]&&(t=e[Math.floor(i/3)][i%3])})),t||(e.every((e=>e.every((e=>""!==e))))?"draw":null)}}minimax(e,t){const i=this.checkWinner(e);if(null!==i)return{score:{o:10,x:-10,draw:0}[i],move:[-1,-1]};const s=[];e.forEach(((i,a)=>{i.forEach(((i,r)=>{if(""===i){const i=e.map((e=>[...e]));i[a][r]=t?"o":"x";const l=this.minimax(i,!t).score;s.push([l,[a,r]])}}))}));const a=s.map((([e,t])=>e)),r=s.map((([e,t])=>t)),l=t?a.reduce(((e,t,i)=>t>a[e]?i:e),0):a.reduce(((e,t,i)=>t<a[e]?i:e),0),n=r[l];return{score:a[l],move:n}}selectNextPlay(e){return this.minimax(e,!0).move}}},247:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const s=i(245),a=i(906);t.Game=class{constructor(e){this.toggleClickHandle=e=>{this.isPlaying||(this.isMultiplayer=e)},this.playClickHandle=(e,t)=>{if(this.changeToggle(!0),this.board[e][t]||this.isWaiting)return;if(this.board[e][t]=this.currentPlayer,this.display.updateBoard(e,t,this.currentPlayer),this.isGameWon())return this.increaseScore(),this.display.updateScore(this.score,this.currentPlayer),void this.gameOver(this.currentPlayer);const i=this.board.every((e=>e.every((e=>e))));i?this.gameOver():this.isMultiplayer?this.switchPlayer():(this.switchPlayer(),this.isAIPlaying?this.isAIPlaying=!1:(this.isAIPlaying=!0,this.isWaiting=!0,setTimeout((()=>{this.isWaiting=!1;const[e,t]=this.AI.selectNextPlay(this.board);this.display.clickHandleAI(e,t)}),this.waitAIPlay)))},this.gameOver=e=>{this.isWaiting=!0,this.display.printGameOver(e),setTimeout((()=>{this.resetBoard(),this.isWaiting=!1,this.isAIPlaying=!1,this.currentPlayer=this.players.x,this.display.clearBoard(this.players.x),this.changeToggle(!1),this.display.cleanGameOver()}),this.wait)},this.changeToggle=e=>{this.isPlaying=e,this.display.disableToggle(e)},this.createBoard=()=>[["","",""],["","",""],["","",""]],this.resetBoard=()=>{this.board=this.createBoard()},this.isGameWon=()=>a.WINNING_PATTERNS.some((([e,t,i])=>this.board[Math.floor(e/3)][e%3]===this.currentPlayer&&this.board[Math.floor(t/3)][t%3]===this.currentPlayer&&this.board[Math.floor(i/3)][i%3]===this.currentPlayer)),this.switchPlayer=()=>{this.currentPlayer=this.currentPlayer===this.players.x?this.players.o:this.players.x},this.increaseScore=()=>{this.score[this.currentPlayer]+=1},this.display=e,this.board=this.createBoard(),this.players={x:"x",o:"o"},this.wait=1500,this.waitAIPlay=300,this.isWaiting=!1,this.isPlaying=!1,this.isAIPlaying=!1,this.isMultiplayer=!1,this.score={x:0,o:0},this.currentPlayer=this.players.x,this.AI=new s.AI}startGame(){this.display.printBoard(this.board,this.currentPlayer),this.display.printScoreBoard(this.score),this.display.bindHandlerToggle(this.toggleClickHandle),this.display.bindHandlerClick(this.playClickHandle)}}},52:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DOMUtils=void 0;class i{}i.createElement=(e,t,i)=>{const s=document.createElement(e);return t&&s.classList.add(t),i&&(s.dataset[i[0]]=i[1]),s},i.getElement=e=>document.querySelector(e),i.getAllElements=e=>document.querySelectorAll(e),t.DOMUtils=i},619:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Display=void 0;const s=i(52);t.Display=class{constructor(){this.printBoard=(e,t)=>{const i=s.DOMUtils.createElement("h1","game_title");i.textContent="Tic Tac Toe";const a=s.DOMUtils.createElement("label","toggle"),r=s.DOMUtils.createElement("h2","toggle_title");r.textContent="Multijugador:";const l=s.DOMUtils.createElement("div","toggle_wrap"),n=s.DOMUtils.createElement("input","");n.type="checkbox",n.id="isMultiplayer";const o=s.DOMUtils.createElement("div","toggle_switch");l.append(n,o),a.append(r,l);const c=s.DOMUtils.createElement("h2","game_turn");c.textContent="Turno: ";const h=s.DOMUtils.createElement("span","game_symbol");h.id="turn",h.textContent=t,c.append(h);const d=s.DOMUtils.createElement("div","game_board");e.forEach(((e,t)=>{const i=s.DOMUtils.createElement("div","row",["row",t]);d.append(i),e.forEach(((e,t)=>{const a=s.DOMUtils.createElement("div","col",["col",t]);i.append(a)}))})),s.DOMUtils.getElement("#game").append(i,a,c,d)},this.updateBoard=(e,t,i)=>{s.DOMUtils.getElement("#turn").textContent="x"===i?"o":"x";const a=s.DOMUtils.createElement("span",i);a.textContent=i,s.DOMUtils.getElement(`[data-row="${e}"] [data-col="${t}"]`).append(a)},this.clearBoard=e=>{s.DOMUtils.getElement("#turn").textContent=e,s.DOMUtils.getAllElements(".col").forEach((e=>{e.textContent=""}))},this.printScoreBoard=e=>{const t=s.DOMUtils.createElement("div","game_score"),i=s.DOMUtils.createElement("h2","game_score-title");i.textContent="Puntaje:";const a=s.DOMUtils.createElement("div","game_score-display"),r=(e,t)=>{const i=s.DOMUtils.createElement("div",e);i.textContent=`Jugador ${e} : `;const a=s.DOMUtils.createElement("span","game_score-player");return a.id=`score-${e}`,a.textContent=`${t}`,i.append(a),i},l=r("x",e.x),n=r("o",e.o);a.append(l,n),t.append(i,a),s.DOMUtils.getElement("#game").append(t)},this.updateScore=(e,t)=>{const i=s.DOMUtils.getElement(`#score-${t}`),a=e[t];i.textContent=`${a}`},this.printGameOver=e=>{const t=s.DOMUtils.createElement("div","overlay"),i=s.DOMUtils.createElement("h1","overlay_title");if(i.textContent="Game Over",e){const a=s.DOMUtils.createElement("span","overlay_subtitle");a.textContent=`${e.toUpperCase()} ha ganado`;const r=s.DOMUtils.createElement("div","overlay_container");r.append(i,a),t.append(r)}else t.append(i);s.DOMUtils.getElement("#game").append(t)},this.cleanGameOver=()=>{s.DOMUtils.getElement(".overlay").remove()},this.bindHandlerToggle=e=>{s.DOMUtils.getElement("#isMultiplayer").addEventListener("change",(t=>{const i=t.target.checked;e(i)}))},this.clickHandleAI=(e,t)=>{s.DOMUtils.getAllElements(".col")[3*e+t].click()}}disableToggle(e){s.DOMUtils.getElement("#isMultiplayer").disabled=e}bindHandlerClick(e){s.DOMUtils.getAllElements(".col").forEach((t=>{t.addEventListener("click",(t=>{const i=t.target,s=Number(i.parentElement.dataset.row),a=Number(i.dataset.col);e(s,a)}))}))}}}},t={};function i(s){var a=t[s];if(void 0!==a)return a.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,i),r.exports}i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=i(247),t=i(619);i(213),new e.Game(new t.Display).startGame()})()})();