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
  }


  #invalidCoord(posX, posY) {
    return (
      posX <= 0 || posX > 10 ||
      posY <= 0 || posY > 10 ||
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

        shipsCoordinates[`${posX},${posY}`] = `ship${shipCountInner}`
      }
      
      // merging shipsCoordinates into this.occupiedCoord (mutates)
      Object.assign(this.occupiedCoord, shipsCoordinates);
      return true;
    }

    // If ship's direction is vertical:
    const endCoordX = posX + length;

    for (posX; posX < endCoordX; posX++) {
      if (this.#invalidCoord(posX, posY)) return false;

      shipsCoordinates[`${posX},${posY}`] = `ship${shipCountInner}`
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

}
