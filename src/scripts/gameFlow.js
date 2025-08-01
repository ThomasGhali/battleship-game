import Gameboard from "./gameboard.js";
import Player from "./player.js";

export default class GameFlow {
  constructor(name) {
    this.player = new Player(name, false);
    this.opponent = new Player("Computer", true);
  }

  #playTurn(x, y, attacked) {
    if (!attacked.gameboard.recieveAttack(x, y)) return false;

    if (!attacked.gameboard.fleetCheck()) return 'Done';

    return "Hit"
  }

  async fullRound(x, y, attacked = this.opponent) {
    if (!this.#playTurn(x, y, attacked)) return false;

    if (attacked === this.player) return

    await new Promise(resolve => setTimeout(resolve, 200)); // Delay before computer moves

    const [pcX, pcY] = this.opponent.computerMove();

    this.fullRound(pcX, pcY, this.player)
  }

  
}