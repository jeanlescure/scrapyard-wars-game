import BaseState from './BaseState';
import GameBg from '../objects/GameBg';

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

    this.game.world.store.howlManager.playSequence(['gameStart', 'gameMusic']);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
