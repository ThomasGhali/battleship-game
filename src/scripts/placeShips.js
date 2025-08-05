export function createBoard() {
  const board = document.querySelector(".placing-board");

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