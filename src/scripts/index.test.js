import { Ship, Gameboard } from "./index.js";

// --- Ship Tests ---
test("should mark ship as sunk after enough hits", () => {
  const ship1 = new Ship(2);
  ship1.hit();
  ship1.hit();
  ship1.isSunk();
  expect(ship1.sunk).toBe(true);
})

// --- Gameboard Tests ---
describe("Gameboard", () => {
  describe("Gameboard coordinates check and save", () => {
    test("Save the occupied coordinates of a selected ship (horizontal) in the an object", () => {
      const gameboard1 = new Gameboard();
      gameboard1.placeShip(2, 2, 3, 'horizontal');
      expect(gameboard1.occupiedCoord).toEqual({
        '2,2' : 1,
        '2,3' : 1,
        '2,4' : 1
      })
    })
    
    test("Save the occupied coordinates of a selected ship (vertical) in the an object", () => {
      const gameboard1 = new Gameboard();
      gameboard1.placeShip(2, 2, 3, 'vertical');
      expect(gameboard1.occupiedCoord).toEqual({
        '2,2' : 1,
        '3,2' : 1,
        '4,2' : 1
      })
    })
    
    test("Save coordinates of multiple ships with different directions", () => {
      const gameboard1 = new Gameboard();
      
      gameboard1.placeShip(2, 2, 3, 'vertical');
      gameboard1.placeShip(2, 3, 4, 'horizontal');
    
      expect(gameboard1.occupiedCoord).toEqual({
        '2,2' : 1,
        '3,2' : 1,
        '4,2' : 1,
        '2,3' : 2,
        '2,4' : 2,
        '2,5' : 2,
        '2,6' : 2
      })
    
    })
    
    test("Refuse adding a coordinate to coordinates object if it already exists", () => {
      const gameboard1 = new Gameboard();
      
      gameboard1.placeShip(2, 2, 3, 'vertical');
      gameboard1.placeShip(2, 2, 4, 'horizontal');
    
      expect(gameboard1.occupiedCoord).toEqual({
        '2,2' : 1,
        '3,2' : 1,
        '4,2' : 1
      })
    
    })
  
  })  

  test("every ship can recieve an attack, gets hit, and sinks", () => {
    const gameboard1 = new Gameboard();
  
    gameboard1.placeShip(2, 2, 4, 'horizontal');
    gameboard1.receiveAttack(2, 2);
    gameboard1.receiveAttack(2, 3);
    gameboard1.receiveAttack(2, 4);
    gameboard1.receiveAttack(2, 5);

    const ship = gameboard1.ships[0];
  
    expect(ship.sunk).toBe(true);
  })

  test("Check if fleet is alive or not when nothing sunk", () => {
    const gameboard1 = new Gameboard();
  
    gameboard1.placeShip(2, 2, 4, 'horizontal');
  
    expect(gameboard1.fleetCheck()).toBe('fleet alive');
  })

  test("Check if fleet is alive or not when all sunk", () => {
    const gameboard1 = new Gameboard();
  
    gameboard1.placeShip(2, 2, 4, 'horizontal');
    gameboard1.receiveAttack(2, 2);
    gameboard1.receiveAttack(2, 3);
    gameboard1.receiveAttack(2, 4);
    gameboard1.receiveAttack(2, 5);

    expect(gameboard1.fleetCheck()).toBe(false);
  })

})