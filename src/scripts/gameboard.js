import Ship from "./ship.js";

export default class Gameboard {
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

  checkCoords(posX, posY, length, direction) {
    const shipCountInner = this.shipCount + 1;
    const shipsCoordinates = {};
  
    const isHorizontal = direction === "horizontal";
  
    for (let i = 0; i < length; i++) {
      const x = isHorizontal ? posX : posX + i;
      const y = isHorizontal ? posY + i : posY;
  
      if (this.#invalidCoord(x, y)) return false;
  
      shipsCoordinates[`${x},${y}`] = shipCountInner;
    }
    
    return shipsCoordinates;
  }

  placeShip(startX, startY, length, direction) {
    const placementValid = this.checkCoords(startX, startY, length, direction)
    
    if (placementValid) {
      Object.assign(this.occupiedCoord, placementValid);
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

  fleetCheck() {
    for (let ship of this.ships) {
      if (!ship.sunk) return 'fleet alive'
    }

    return false;
  }
}
