import Player from "./player.js";

export default class GameFlow {
  constructor(name) {
    this.player = new Player(name, false);
    this.opponent = new Player("Computer", true);
  }

  #playTurn(x, y, attacked) {
    if (!attacked.gameboard.receiveAttack(x, y)) return false;

    if (!attacked.gameboard.fleetCheck()) return 'Game over';

    return "Hit"
  }

  async fullRound(x, y, attacked = this.opponent) {
    const result = this.#playTurn(x, y, attacked);
    
    // Invalid Move - player must retry
    if (!result) return false; 
    // Game over - all ships sunk
    else if (result === "Game over") return true; 

    // Round ended - waiting for next round
    if (attacked === this.player) return; 

    // Delay before computer attacks
    await new Promise(resolve => setTimeout(resolve, 200));

    const [pcX, pcY] = this.opponent.computerMove();

    await this.fullRound(pcX, pcY, this.player);
  }

}
