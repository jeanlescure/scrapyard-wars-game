import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';
import IntroTitle from '../objects/IntroTitle';

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

    this.titleSprite = new IntroTitle({
      game: this.game,
      x: 0,
      y: 0,
    });
    this.addUpdateable(this.titleSprite);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
