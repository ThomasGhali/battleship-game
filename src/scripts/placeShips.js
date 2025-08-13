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
  const board = document.querySelector('.placing-board');
  let selectedShip = null;
  let validity = false;

  shipsWindow.addEventListener('mousedown', (event) => {
    const shipImg = event.target.closest('.ship__img');

    if(!shipImg) return;

    selectedShip = event.target.closest('.ship');
    selectedShip.classList.add('dragged');

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDrop);
  })

  function onDrag(event) {
    if (!selectedShip) return;

    const tile = event.target.closest('.tile');
    if (!tile) return; // Ignore if it's not a tile

    const x = parseInt(tile.dataset.x);
    const y = parseInt(tile.dataset.y);
    const shipLength = parseInt(selectedShip.dataset.shipLength) ;
    const shipDirection = selectedShip.dataset.shipDirection;

    // gameflow should be an imported instance of GameFlow
    validity = gameflow.player.gameboard.checkCoords(
      x, y, shipLength, shipDirection
    );

    console.log(x, y, shipLength, shipDirection)
    console.log(validity ? 'Valid move' : 'Invalid move')
  }

  function onDrop() {
    document.removeEventListener('mousemove', onDrag);
    selectedShip.classList.remove('dragged');

    if (validity) selectedShip.classList.add('chosen');

    selectedShip = null;
    validity = false;
  }

}