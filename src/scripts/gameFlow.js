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

    if (!result) return false; // Invalid Move - player must retry
    else if (result === "Game over") return true; // Game over - all ships sunk

    if (attacked === this.player) return; // Round ended - waiting for next round

    await new Promise(resolve => setTimeout(resolve, 200)); // Delay before computer moves

    const [pcX, pcY] = this.opponent.computerMove();

    await this.fullRound(pcX, pcY, this.player);
  }

}
