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
    if (this.game.input.activePointer.isDown) {
      this.destinationX = Math.floor(this.game.input.x / 10) * 10;
    }

    if (Math.floor(this.x / 10) === Math.floor(this.destinationX / 10)) {
      this.body.velocity.x = 0;
    } else if (this.x > this.destinationX) {
      this.body.velocity.x = -300;
      this.scale.x = -1;
    } else if (this.x < this.destinationX) {
      this.body.velocity.x = 300;
      this.scale.x = 1;
    }

    if (this.body.velocity.x !== 0) {
      this.animations.play('walk');
    } else {
      this.animations.play('wait');
    }
  }
}
