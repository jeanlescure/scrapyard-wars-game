import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';

/**
 * Setup and display the character selection state.
 */
export default class CharacterSelect extends BaseState {
  /**
   * Setup all objects, etc needed for the character selection state.
   */
  create() {
    this.addUpdateable(new IntroBg({
      game: this.game,
      x: 0,
      y: 0,
    }));
  }

  /**
   * Handle actions in the character selection loop.
   */
  update() {
    BaseState.update.call(this);

    if (this.game.input.activePointer.isDown) {
      this.game.state.start('Tutorial');
    }
  }
}
