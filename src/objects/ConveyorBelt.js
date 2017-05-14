import _ from 'lodash';
import {CONVEYOR_BELT_ANIMATIONS} from '../Constants';

/**
 * Setup and control conveyor belt animated tile.
 */
export default class ConveyorBelt extends Phaser.TileSprite {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer,
   *    width: integer,
   *    height: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y, width, height}) {
    super(game, x, y, width, height, 'conveyor-belt', 0);

    this.scale.x = 0.5;
    this.scale.y = 0.5;

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0, 0);

    _.each(CONVEYOR_BELT_ANIMATIONS, (animation) => {
      this.animations.add(animation.name, animation.frames, animation.speed);
    });
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    this.animations.play('move');
  }
}
