import howler from 'howler';
import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';
import IntroTitle from '../objects/IntroTitle';

import introMusic from '../assets/audio/intro-music.mp3';
import selectedSound from '../assets/audio/selected.mp3';

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

    new howler.Howl({
      src: [introMusic],
      loop: true,
    }).play();

    const titleClickHandler = function titleClickHandler() {
      new howler.Howl({
        src: [selectedSound],
        loop: false,
      }).play();

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
