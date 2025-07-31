import '../styles/style.css';

// every ship should have a Ship instance
export class Ship {
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

//
export class Gameboard {
  constructor() {
    this.ships = [];
    this.shipCount = 0;
    this.occupiedCoord = {};
    this.attacks = {}
  }


  #invalidCoord(posX, posY) {
    return (
      posX < 1 || posX > 10 ||
      posY < 1 || posY > 10 ||
      this.occupiedCoord[`${posX},${posY}`]
    );
  }

  #placeCoords(posX, posY, length, direction) {
    const shipCountInner = this.shipCount + 1;
    const shipsCoordinates = {};

    // If ship's direction is horizontal:
    if (direction === 'horizontal') {

      const endCoordY = posY + length;

      for (posY; posY < endCoordY; posY++) {
        if (this.#invalidCoord(posX, posY)) return false;

        shipsCoordinates[`${posX},${posY}`] = shipCountInner;
      }
      
      // merging shipsCoordinates into this.occupiedCoord (mutates)
      Object.assign(this.occupiedCoord, shipsCoordinates);
      return true;
    }

    // If ship's direction is vertical:
    const endCoordX = posX + length;

    for (posX; posX < endCoordX; posX++) {
      if (this.#invalidCoord(posX, posY)) return false;

      shipsCoordinates[`${posX},${posY}`] = shipCountInner;
    }

    Object.assign(this.occupiedCoord, shipsCoordinates);
    return true;
  }

  placeShip(startX, startY, length, direction) {
    if (this.#placeCoords(startX, startY, length, direction)) {
      const newShip = new Ship(length);
      newShip.shipId = this.shipCount++;
      this.ships.push(newShip);

      return true;
    }

    return false;
  }

  receiveAttack(x, y) {
    if (x < 1 || x > 10 || y < 1 || y > 10) return false;

    if (`${x},${y}` in this.attacks) return false;

    if (!this.occupiedCoord[`${x},${y}`]) {
          this.attacks[`${x},${y}`] = false;
          
          return 'miss';
    }

    const hitShip = this.occupiedCoord[`${x},${y}`];
    const ship = this.ships[hitShip - 1];

    this.attacks[`${x},${y}`] = hitShip;
    ship.hit();
    ship.isSunk();

    return 'hit';
  }

}
