import GameFlow from "./gameFlow";

export function createBoard() {
  const board = document.querySelector('.placing-board');

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    board.appendChild(cell);
    cell.dataset.id = i;
    cell.classList.add('tile');
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

export function initPlaceScreen() {
    const shipsWindow = document.querySelector('.ships-to-place');

    shipsWindow.addEventListener('click', (event) => {
      if (event.target.classList.contains('ship__rotate')) {
        const ship = event.target.closest('.ship')
        const shipImg = ship.querySelector('.ship__img');

        shipImg.classList.toggle('rotate');
        ship.dataset.shipDirection = ship.dataset.shipDirection === 'horizontal'? 'vertical' : 'horizontal';
      }
    })

    const startGameBtn = document.querySelector('.start-game-btn');

    const ships = document.querySelectorAll('.ship');
    startGameBtn.addEventListener('click', () => {
      ships.map(ship => {
        GameFlow.
        ship.dataset.x
        ship.dataset.y
        ship.dataset.shipLength
        ship.dataset.shipDirection
      })
    })
}