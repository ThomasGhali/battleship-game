import '../styles/style.css'
import Ship from './ship.js'
import Gameboard from './gameboard.js'
import Player from './player.js'
import GameFlow from './gameFlow.js'
import showSplash from "./splash.js";

document.addEventListener("DOMContentLoaded", () => {
  showSplash();

})

//---------------------- index.js
// import { showSplash } from './splash.js';
// import { initMenu, showMenu } from './menu.js';
// import { initGame, showGame } from './game.js';

// document.addEventListener('DOMContentLoaded', () => {
//   initMenu();      // wire up menu button events
//   initGame();      // set up your game canvas/events
//   showSplash()     // kick things off
//     .then(showMenu)
//     .catch(console.error);
// });

// ------------- menu.js
// let resolveMenu;
// export function initMenu() {
//   document.querySelector('#menu [data-action="start"]')
//     .addEventListener('click', () => {
//       // fade-out menu, then start game
//       const menu = document.getElementById('menu');
//       menu.classList.remove('active');
//       setTimeout(resolveMenu, 1000);
//     });
// }

// export function showMenu() {
//   return new Promise(resolve => {
//     resolveMenu = resolve;
//     const menu = document.getElementById('menu');
//     menu.classList.add('active');
//   });
// }

//------------------------game.js
//export function initGame() {
// e.g. set up Canvas, load assets, add event handlers…
// }

// export function showGame() {
//   const game = document.getElementById('game');
//   game.classList.add('active');
// }