import BaseState from './BaseState';
import GameBg from '../objects/GameBg';
import Linus from '../objects/Linus';
import {HEIGHT} from '../Constants';

/**
 * Setup and display the main game state.
 */
export default class Main extends BaseState {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.gameBg = new GameBg({
      game: this.game,
      x: 0,
      y: 0,
    });

    this.playerOne = new Linus({
      game: this.game,
      x: this.game.world.centerX,
      y: HEIGHT,
    });

    this.addUpdateable(this.playerOne);

    this.game.world.store.howlManager.playSequence(['gameStart', 'gameMusic']);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
