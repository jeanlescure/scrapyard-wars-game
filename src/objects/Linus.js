import _ from 'lodash';
import Playable from './Playable';
import {LINUS_ANIMATIONS} from '../Constants';
/**
 * Setup and control player one (8-bit Linus Sebastian) sprite.
 */
export default class Linus extends Playable {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y}) {
    super({game, x, y});

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5, 1);

    _.each(LINUS_ANIMATIONS, (animation) => {
      this.animations.add(animation.name, animation.frames, animation.speed);
    });
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    this.animations.play('wait');
  }
}
