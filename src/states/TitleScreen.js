import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';

/**
 * Setup and display the main game state.
 */
export default class TitleScreen extends BaseState {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    this.addUpdateable(new IntroBg({
      game: this.game,
      x: 0,
      y: 0,
    }));
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);

    if (this.game.input.activePointer.isDown) {
      this.game.state.start('CharacterSelect');
    }
  }
}
