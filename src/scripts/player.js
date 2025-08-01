import Gameboard from "./gameboard.js";

export default class Player {
  constructor(name, isComputer) {
    this.isComputer = isComputer;
    this.name = name;
    this.validMoves = [];
    this.gameboard = new Gameboard();

    if (this.isComputer) {
      this.#formValidMovesArr();
    }
  }

  #formValidMovesArr() {
    for (let i = 0; i < 10; i++) {

      for (let j = 0; j < 10; j++) {
        this.validMoves.push([i, j]);
      }

    }

    return true;
  }

  computerMove() {
    const indeces = this.validMoves.length;
    const randomIndex = Math.floor(Math.random() * indeces);
    const move = this.validMoves[randomIndex];

    this.validMoves.splice(randomIndex, 1);

    return move;
  }

  // playTurn(x, y) {
  //   if (this.isComputer) {
  //     return this.#makeRandomMove();
  //   }

  //   this.gameboard.
    
  // }
}
