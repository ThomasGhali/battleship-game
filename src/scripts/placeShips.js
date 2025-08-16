// import an instance of gameflow which is made when the user enters
// his name and clicks start
import { gameflow } from "./index.js";
import Player from "./player.js";

export function createBoard(boardClass) {
  const board = document.querySelector(boardClass);
  board.innerHTML = "";
  
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

const placeShipsScreen = document.getElementById('place-ships');
export async function showBoardScreen() {
  placeShipsScreen.classList.add('active');

  // fade in
  await new Promise(r => setTimeout(r, 500)); 
}

export async function hideBoardScreen() {
  placeShipsScreen.classList.remove("active");

  // fade out
  await new Promise(r => setTimeout(r, 500));
}

/**
 * Initializes the ship placement screen UI:
 * - Handles ship rotation, selection, and sticking to cursor
 * - Validates placement on hover
 * - Allows manual reset, and auto-placement of ships
 * 
 * Resolves when all ships are placed and start button clicked.
*/
const shipsWindow = document.querySelector('.ships-to-place');
export function initPlaceScreen() {
  return new Promise((resolve) => {
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
    let shipImage = null;
    
    // Make ship stick to cursor
    function stickToCursor(e) {
      if (!shipImage) return;
      shipImage.style.left = e.clientX + "px";
      shipImage.style.top = (e.clientY - 15) + "px";
    }

    function resetSticking() {
      document.removeEventListener('mousemove', stickToCursor);
      if (shipImage) {
        shipImage.classList.remove("sticking");
        shipImage.style.left = '';
        shipImage.style.top = '';
        shipImage = null;
      }
    }

    shipsWindow.addEventListener('click', (event) => {
      const ship = event.target.closest(".ship");

      // Not a ship or already chosen, exit
      if (!ship || ship.classList.contains("chosen")) return;
      
      
      // Clicking same ship again unselects it, exit
      if (ship === selectedShip) {
        resetSticking();
        ship.classList.remove('selected');
        selectedShip = null;
        return
      }

      const clickedImg = event.target.closest(".ship__img");
      if (!clickedImg) return;

      // Remove selection from other ships
      if (selectedShip) {
        document.querySelectorAll('.selected').forEach(sel => sel.classList.remove('selected'));
        resetSticking();
      }

      // If ship valid, select it
      selectedShip = ship;
      ship.classList.add('selected');
      // Make it stick to cursor
      shipImage = clickedImg;
      shipImage.classList.add('sticking');

      // Ensure single handler
      document.removeEventListener("mousemove", stickToCursor);
      document.addEventListener("mousemove", stickToCursor);

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


  window.gameflow = gameflow;
    /* --- placing ships --- */

    const allTiles = document.querySelectorAll('.tile');
    const tilesCount = 100;

    // Print ships on occupied tiles
    function previewShipOnBoard() {
      const occupiedCoord = Object.keys(gameflow.player.gameboard.occupiedCoord);
    
      occupiedCoord.forEach(key => {
        const [x, y] = key.split(',');
    
        for (let i = 0; i < tilesCount; i++) {
          const tile = allTiles[i];
          if (tile.dataset.x === x && tile.dataset.y === y) {
            tile.classList.add('tile-occupied');
          }
        }
      });
    }

    // Clear all previously occupied tiles
    function clrPreviewShipOnBoard() {
      for (let i = 0; i < tilesCount; i++) {
        const tile = allTiles[i]
        if (tile.classList.contains('tile-occupied')) {
          tile.classList.remove('tile-occupied');
        }
      }
    }

    board.addEventListener('click', (event) => {
      if (!selectedShip) return;

      const tile = event.target.closest('.tile');
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
      selectedShip.classList.remove("selected");
      selectedShip.classList.add("chosen");
      previewShipOnBoard();
      resetSticking();
      selectedShip = null;
    })

    /* --- Reset --- */
    
    const resetBtn = document.querySelector('.reset-board-btn');
    const ships = document.querySelectorAll(".ship");

    resetBtn.addEventListener('click', () => {
      
      ships.forEach((ship) => {
        ship.classList.remove('chosen');
      })
      
      // Remove all added styles
      resetSticking()
      if (selectedShip) {
        selectedShip.classList.remove("selected");
        selectedShip = null;
      }

      
      gameflow.player.gameboard.occupiedCoord = {};
      gameflow.player.gameboard.shipCount = 0;
      clrPreviewShipOnBoard();
      
    })

    /* --- Auto place ships --- */

    const autoPositionBtn = document.querySelector(".random-place-btn");

    // Random integer within range of -> 1 to max
    function randomNum(max) {
      return Math.ceil(Math.random() * max);
    }

    // Give random position and direction
    function giveRandomPosition() {
      const x = randomNum(10);
      const y = randomNum(10);
      const direction = ['horizontal', 'vertical'][randomNum(2) - 1];

      return {
        x,
        y,
        direction
      }
    }

    // Auto places ship for a passed side (player or opponent)
    // e.g. autoPositionShips(gamflow.player)
    function autoPositionShips(side) {
      const maxShipLength = 5;
      
      for (let length = 1; length <= maxShipLength; length++) {
        let isValid = null;
        let x, y, direction;
        let attempts = 0;
        // If not valid give another random position
        while (!isValid) {
          ({ x, y, direction} = giveRandomPosition());
          isValid = side.gameboard.checkCoords(
            x, y, length, direction
          )
        }

        side.gameboard.placeShip(x, y, length, direction)
      }

    }

    autoPositionBtn.addEventListener("click", () => {
      // Trigger a reset
      resetBtn.dispatchEvent(new Event("click"));
      autoPositionShips(gameflow.player);

      ships.forEach((ship) => ship.classList.add("chosen"));
      previewShipOnBoard();
    })

    // Starting the game and potentially resolving
    const startGameBtn = document.querySelector('.start-game-btn');
    const startGameBtnMessage = document.querySelector(".start-game-btn__message");
    startGameBtn.addEventListener("click", async () => {
      if (gameflow.player.gameboard.shipCount < 5) {
        startGameBtnMessage.textContent = 'You have to place all your ships first';
        startGameBtn.disabled = true;
        await new Promise(res => setTimeout(res, 2000));
        startGameBtnMessage.textContent = '';
        startGameBtn.disabled = false;
        return;
      }

      resolve();
    })
  })
}
