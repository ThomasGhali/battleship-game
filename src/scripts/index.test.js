import Ship from './ship.js'
import Gameboard from './gameboard.js'
import Player from './player.js'
import GameFlow from './gameFlow.js'


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

// --- Player class tests ---
describe("Player class", () => {
  test("", () => {

  })
  
})

// --- Game flow module test ---
describe("Player class", () => {
  test("player hits computer and hit is stored in computer gamboard", () => {
    const gameFlow = new GameFlow("thomas");
    // placing a ship for each
    gameFlow.opponent.gameboard.placeShip(2, 2, 3, "horizontal");
    gameFlow.player.gameboard.placeShip(2, 2, 3, "horizontal");

    // player sends a hit to computer
    gameFlow.opponent.gameboard.receiveAttack(2, 3);
    
    expect(gameFlow.opponent.gameboard.attacks).toEqual({
      '2,3' : 1
    })
  }) 

  test("exchange attacks between player and computer hitting each other", () => {
    const gameFlow = new GameFlow("thomas");
    // placing a ship for each
    gameFlow.opponent.gameboard.placeShip(2, 2, 3, "horizontal");
    gameFlow.player.gameboard.placeShip(2, 2, 3, "horizontal");

    // player sends a hit to computer
    gameFlow.opponent.gameboard.receiveAttack(2, 3);
    gameFlow.player.gameboard.receiveAttack(2, 4);
    
    expect(gameFlow.player.gameboard.attacks).toEqual({
      '2,4' : 1
    })

    expect(gameFlow.opponent.gameboard.attacks).toEqual({
      '2,3' : 1
    })
  })


  test("player sinks computer ship", async () => {
    const gameFlow = new GameFlow("thomas");

    // placing a ship for each
    gameFlow.opponent.gameboard.placeShip(2, 2, 3, "horizontal");
    gameFlow.player.gameboard.placeShip(2, 2, 3, "horizontal");

    // making computer moves predictable not random for test
    jest.spyOn(gameFlow.opponent, 'computerMove')
      .mockReturnValueOnce([1,1])
      .mockReturnValueOnce([1,2])
      .mockReturnValueOnce([1,3]);

    // player send hits to computer, computer sends automatically
    await gameFlow.fullRound(2,2);
    await gameFlow.fullRound(2,3);
    const result = await gameFlow.fullRound(2,4);

    // player wins
    expect(result).toBe(true);
  })

})
