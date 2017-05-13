import _ from 'lodash';
import throttle from 'lodash.throttle';
import {WIDTH, HEIGHT} from '../Constants';

/**
 * Setup and display the main game state.
 */
export default class BaseState extends Phaser.State {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  init() {
    this.marginTopValue = '-';
    this.marginLeftValue = '-';
    this.updateables = [];

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  /**
   * Extend the state's update loop so we can re-calculate
   * the centering margins, as well as to call the `updateCallback()`
   * method for each item in the `updateables` array.
   */
  static update() {
    if (this.game.canvas.style.marginTop !== this.marginTopValue) {
      window.dispatchEvent(new Event('resize'));
      this.game.canvas.style.marginTop = this.marginTopValue;
      this.game.canvas.style.marginLeft = this.marginLeftValue;
    }

    _.each(this.updateables, (u) => {
      u.updateCallback();
    });
  }

  /**
   * Add a game object with an `updateCallback()` method.
   * @param {Phaser.GameObjectFactory} gameObject Instance of a game
   * object containing an `updateCallback()` method.
   */
  addUpdateable(gameObject) {
    this.updateables.push(gameObject);
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    this.scale.setGameSize(WIDTH, HEIGHT);

    this.marginTopValue = `-${Math.ceil(this.game.canvas.offsetHeight / 2)}px`;
    this.marginLeftValue = `-${Math.ceil(this.game.canvas.offsetWidth / 2)}px`;
  }
}
