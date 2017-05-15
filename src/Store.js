import HowlManager from './HowlManager';

/**
 * Setup all objects, etc needed for global data management.
 */
export default class Store {
  /**
   * Constructor.
   */
  constructor() {
    this.reset();
  }

  /**
   * Reset all data.
   */
  reset() {
    this.player = {
      character: -1, // should be either 0 or 1 once selected
    };

    this.match = {
      uid: '',
      started: false,
      ended: false,
      score: 0,
      goal: 0,
      parts: [],
    };

    // Simple object to manage sounds. E.g. `this.howls.introMusic.play`
    if (!this.howlManager) {
      this.howlManager = new HowlManager();
    }
  }
}
