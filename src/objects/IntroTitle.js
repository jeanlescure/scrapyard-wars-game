import _ from 'lodash';
import {WIDTH, HEIGHT, INTRO_TITLE_ANIMATIONS} from '../Constants';

/**
 * Setup and control intro background.
 */
export default class IntroTitle extends Phaser.Sprite {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y}) {
    super(game, x, y, 'intro-title', 0);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0, 0);
    this.width = WIDTH;
    this.height = HEIGHT;

    _.each(INTRO_TITLE_ANIMATIONS, (animation) => {
      this.animations.add(animation.name, animation.frame, animation.speed);
    });
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    this.animations.play('blink');
  }
}
