import '../styles/style.css'
import Ship from './ship.js'
import Gameboard from './gameboard.js'
import Player from './player.js'
import GameFlow from './gameFlow.js'
import showSplash from "./splash.js";
import showMenu from './menu.js'
import { createBoard, showBoardScreen, initPlaceScreen, hideBoardScreen} from './placeShips.js'

export const gameflow = new GameFlow('tom');

document.addEventListener("DOMContentLoaded", async () => {
  // await showSplash();
  // await showMenu();
  // await showBoardScreen();
  // createBoard('.placing-board');
  // await initPlaceScreen();
  // await hideBoardScreen();

})

//------------------------game.js
//export function initGame() {
// e.g. set up Canvas, load assets, add event handlers…
// }

// export function showGame() {
//   const game = document.getElementById('game');
//   game.classList.add('active');
// }