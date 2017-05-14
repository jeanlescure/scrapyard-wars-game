import _ from 'lodash';

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
  }

  /**
   * Extend the state's update loop so we can re-calculate
   * the centering margins, as well as to call the `updateCallback()`
   * method for each item in the `updateables` array.
   */
  static update() {
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
}
