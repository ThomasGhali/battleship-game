import { Ship, Gameboard } from "./index.js";

test("should mark ship as sunk after enough hits", () => {
  const ship1 = new Ship(2);
  ship1.hit();
  ship1.hit();
  ship1.isSunk();
  expect(ship1.sunk).toBe(true);
})

test("should save the occupied coordinates of a selected ship (horizontal) in the an object", () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 2, 3, 'horizontal');
  expect(gameboard1.occupiedCoord).toEqual({
    '2,2' : 'ship1',
    '2,3' : 'ship1',
    '2,4' : 'ship1'
  })
})

test("should save the occupied coordinates of a selected ship (vertical) in the an object", () => {
  const gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 2, 3, 'vertical');
  expect(gameboard1.occupiedCoord).toEqual({
    '2,2' : 'ship1',
    '3,2' : 'ship1',
    '4,2' : 'ship1'
  })
})

test("should save coordinates of multiple ships with different directions", () => {
  const gameboard1 = new Gameboard();
  
  gameboard1.placeShip(2, 2, 3, 'vertical');
  gameboard1.placeShip(2, 3, 4, 'horizontal');

  expect(gameboard1.occupiedCoord).toEqual({
    '2,2' : 'ship1',
    '3,2' : 'ship1',
    '4,2' : 'ship1',
    '2,3' : 'ship2',
    '2,4' : 'ship2',
    '2,5' : 'ship2',
    '2,6' : 'ship2'
  })

})

test("should refuse adding a coordinate to coordinates object if it already exists", () => {
  const gameboard1 = new Gameboard();
  
  gameboard1.placeShip(2, 2, 3, 'vertical');
  gameboard1.placeShip(2, 2, 4, 'horizontal');

  expect(gameboard1.occupiedCoord).toEqual({
    '2,2' : 'ship1',
    '3,2' : 'ship1',
    '4,2' : 'ship1'
  })

})