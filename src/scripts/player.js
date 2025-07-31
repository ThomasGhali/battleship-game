import Gameboard from "./gameboard.js";

export default class Player {
  constructor(name, isComputer) {
    this.isComputer = isComputer;
    this.name = name;
    this.validMoves = [];

    if (this.isComputer) {
      this.#formValidMovesArr();

      return this.#makeRandomMove();
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

  #makeRandomMove() {
    const indeces = this.validMoves.length;
    const move = Math.floor(Math.random() * indeces);

    return move;
  }
}
