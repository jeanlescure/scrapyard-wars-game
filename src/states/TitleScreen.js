import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';
import IntroTitle from '../objects/IntroTitle';

/**
 * Setup and display the title screen state.
 */
export default class TitleScreen extends BaseState {
  /**
   * Setup all objects, etc needed for the title screen state.
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

    this.game.world.store.howlManager.playHowl('introMusic');

    const titleClickHandler = function titleClickHandler() {
      this.game.world.store.howlManager.playHowl('selected');

      this.game.state.start('CharacterSelect');
    };

    this.titleSprite.inputEnabled = true;
    this.titleSprite.events.onInputDown.add(titleClickHandler, this);
  }

  /**
   * Handle actions in the title screen loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
