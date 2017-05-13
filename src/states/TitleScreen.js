import howler from 'howler';
import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';
import IntroTitle from '../objects/IntroTitle';

import introMusic from '../assets/audio/intro-music.mp3';
import selectedSound from '../assets/audio/selected.mp3';

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

    new howler.Howl({
      src: [introMusic],
      loop: true,
    }).play();
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
