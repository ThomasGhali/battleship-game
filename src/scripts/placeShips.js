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

  /* --- Ship selecting --- */

  let selectedShip = null;

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

  /* --- validating selected ship's position --- */

  function getPositionData(tile, ship) {
    const x = parseInt(tile.dataset.x);
    const y = parseInt(tile.dataset.y);
    const shipLength = parseInt(ship.dataset.shipLength) ;
    const shipDirection = ship.dataset.shipDirection;


    // gameflow should be an imported instance of GameFlow
    const validity = gameflow.player.gameboard.checkCoords(
      x, y, shipLength, shipDirection
    );

    return {
      x,
      y,
      shipLength,
      shipDirection,
      validity
    };
  }

  const board = document.querySelector('.placing-board')

  // Add validity styles to hovered tiles
  board.addEventListener('mouseover', (e) => {
    const tile = e.target.closest('.tile');
    // A tile is and ship are selected else, exit
    if (!tile ||  !selectedShip) return;

    const position = getPositionData(tile, selectedShip);
  
    paintPreview(
      position.x, 
      position.y, 
      position.shipLength, 
      position.shipDirection, 
      position.validity
    )
  })

  // Trigger refresh validity styles
  board.addEventListener('mouseleave', clearPreview);

  // Showing validity of placement tile(s)
  function paintPreview(posX, posY, length, direction, isValid) {
    clearPreview();
    const isHorizontal = direction === "horizontal";
    
    for (let i = 0; i < length; i++) {
      const x = isHorizontal ? posX : posX + i;
      const y = isHorizontal ? posY + i : posY;
  
      const tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (tile) {
        tile.classList.add(isValid ? 'valid-preview' : 'invalid-preview');
      }
    }
  }
  
  // Clear any validity style(s)
  function clearPreview() {
    document.querySelectorAll('.valid-preview, .invalid-preview')
      .forEach(tile => tile.classList.remove('valid-preview', 'invalid-preview'));
  }



  /* --- placing ships --- */

  board.addEventListener('click', () => {
    if (!selectedShip) return;

    const tile = e.target.closest('.tile');
    const { 
      x, 
      y, 
      shipLength, 
      shipDirection, 
      validity 
    } = getPositionData(tile, selectedShip);

    if (!validity) return;

    // When valid, place
    gameflow.player.gameboard.placeShip(x, y, shipLength, shipDirection);
  })

}