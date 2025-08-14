// import an instance of gameflow which is made when the user enters
// his name and clicks start
import { gameflow } from "./index.js";

export function createBoard() {
  const board = document.querySelector('.placing-board');
  
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      const cell = document.createElement('div');
      board.appendChild(cell);
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.classList.add('tile');
    }
  }
}

export function showBoard() {
  return new Promise (async (resolve) => {
    const placeShipsScreen = document.getElementById('place-ships');

    placeShipsScreen.classList.add('active')
    // fade in
    await new Promise(r => setTimeout(r, 500)); 
    resolve();
  })
}

const shipsWindow = document.querySelector('.ships-to-place');

export function initPlaceScreen() {
  
  // Rotate button functionality
  shipsWindow.addEventListener('click', (event) => {
    if (event.target.classList.contains('ship__rotate')) {
      const ship = event.target.closest('.ship')
      const shipImg = ship.querySelector('.ship__img');

      shipImg.classList.toggle('rotate');
      ship.dataset.shipDirection = ship.dataset.shipDirection === 'horizontal'? 'vertical' : 'horizontal';
    }
  })

  const shipImages = document.querySelectorAll('.ship__img');
  let selectedShip = null;
  let validity = false;

  shipsWindow.addEventListener('click', (event) => {
    if (!event.target.closest(".ship__img")) return;
    const ship = event.target.closest(".ship");
    
    // Not a ship or already chosen, exit
    if (!ship || ship.classList.contains("chosen")) return;

    // Clicking same ship again unselects it, exit
    if (ship === selectedShip) {
      ship.classList.remove('selected');
      selectedShip = null;
      return
    }

    // Remove selection from other ships
    if (selectedShip) {
      document.querySelectorAll('.selected')
        .forEach(sel => sel.classList.remove('selected'))
    }

    ship.classList.add('selected');
    selectedShip = ship;
  })

  const board = document.querySelector('.placing-board');
  board.addEventListener('click', (event) => {
    // If no selected ships, don't handle event
    if (!selectedShip) return;

    const tile = event.target.closest('.tile');
    if (!tile) return

    const x = parseInt(tile.dataset.x);
    const y = parseInt(tile.dataset.y);
    const shipLength = parseInt(selectedShip.dataset.shipLength) ;
    const shipDirection = selectedShip.dataset.shipDirection;

    // gameflow should be an imported instance of GameFlow
    validity = gameflow.player.gameboard.checkCoords(
      x, y, shipLength, shipDirection
    );

    console.log(validity? "valid" : "invalid")

  })

}