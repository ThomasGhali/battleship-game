// every ship should have a Ship instance
export default class Ship {
  constructor(length) {
    this.shipId = null;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) this.sunk = true;
    return this.sunk;
  }
}
