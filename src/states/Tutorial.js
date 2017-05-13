import BaseState from './BaseState';

/**
 * Setup and display the main game state.
 */
export default class Tutorial extends BaseState {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);

    if (this.game.input.activePointer.isDown) {
      this.game.state.start('Main');
    }
  }
}

