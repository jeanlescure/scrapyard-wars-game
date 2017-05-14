import {Howl} from 'howler';

import IntroMusic from './assets/audio/intro-music.mp3';
import Selected from './assets/audio/selected.mp3';
import GameStart from './assets/audio/game-start.mp3';
import GameMusic from './assets/audio/game-music.mp3';
import GameWin from './assets/audio/game-win.mp3';
import GameLose from './assets/audio/game-lose.mp3';

/**
  * Load and manage sounds from this single source.
  */
export default class HowlManager {
  /**
    * Constructor.
    */
  constructor() {
    // As per https://github.com/goldfire/howler.js/issues/395#issuecomment-164683049
    // Helps restarting the audio context on iOS so it's more stable
    const sound = new Howl({
      /* eslint-disable max-len */
      src: 'data:audio/mp3;base64,SUQzAwAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjAAAAAAlwAAAAAtASxAAAACAAATQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjAMQAAAlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4xjAbAAAAlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      /* eslint-enable max-len */
    });
    sound.unload();

    this.howlCollection = {};

    // Garry, quit it! You're gonna start a howl!
    // https://youtu.be/Jw0c9z8EllE
    this.addHowl('introMusic', new Howl({
      src: [IntroMusic],
      autoplay: false,
      loop: true,
    }));
    this.addHowl('selected', new Howl({
      src: [Selected],
      autoplay: false,
      loop: false,
    }));
    this.addHowl('gameStart', new Howl({
      src: [GameStart],
      autoplay: false,
      loop: false,
    }));
    this.addHowl('gameMusic', new Howl({
      src: [GameMusic],
      autoplay: false,
      loop: true,
    }));
    this.addHowl('gameWin', new Howl({
      src: [GameWin],
      autoplay: false,
      loop: false,
    }));
    this.addHowl('gameLose', new Howl({
      src: [GameLose],
      autoplay: false,
      loop: false,
    }));
  }

  /**
   * Add a `Howl` object to the `howlCollection`.
   * @param {String} name Name to be used to call the howl.
   * @param {Howler.Howl} howl Instance of a Howl.
   */
  addHowl(name, howl) {
    this.howlCollection[name] = howl;
  }

  /**
   * Play a `Howl` from the `howlCollection`.
   * @param {String} name Name to be used to call the howl.
   */
  playHowl(name) {
    this.howlCollection[name].play();
  }

  /**
   * Play a `Howl` from the `howlCollection`.
   * @param {Array} names Names to be used to call the howls sequentially.
   */
  playSequence(names) {
    const self = this;

    const playAndShift = function playAndShift() {
      const howl = self.howlCollection[names[0]];
      howl.play();

      names.shift();

      howl.once('end', () => {
        if (names.length > 0) {
          playAndShift();
        }
      });
    };

    playAndShift();
  }

  /**
   * Stop a `Howl` from the `howlCollection`.
   * @param {String} name Name to be used to call the howl.
   */
  stopHowl(name) {
    this.howlCollection[name].stop();
  }

  /**
   * Stop a `Howl` from the `howlCollection` with a fade.
   * @param {String} name Name to be used to call the howl.
   */
  fadeStopHowl(name) {
    const howl = this.howlCollection[name];
    howl.fade(1.0, 0.0, 1500);
    howl.once('fade', () => {
      howl.stop();
      howl.volume(1.0);
    });
  }
}
