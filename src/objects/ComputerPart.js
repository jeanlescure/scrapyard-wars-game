import _ from 'lodash';
import Playable from './Playable';
import {PART_TYPES} from '../Constants';

/**
 * Setup and control a computer part sprite.
 */
export default class ComputerPart extends Playable {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y}) {
    const partType = _.sample(PART_TYPES);
    super({game, x, y, frame: partType.frame});

    this.partType = partType;
    this.falling = false;
    this.caught = false;

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);

    this.scale.x = 0.375;
    this.scale.y = this.scale.x;

    this.inputEnabled = true;
    this.input.enableDrag();
    this.events.onDragStart.add(() => {
      this.tint = 0xff5500;
      this.scale.x = 0.5;
      this.scale.y = this.scale.x;
      this.body.velocity.x = 0;
    }, this);
    this.events.onDragStop.add(() => {
      this.tint = 0xffffff;
      this.falling = true;
      this.input.draggable = false;
    }, this);
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    if (this.falling) {
      this.scale.x = 0.3;
      this.scale.y = this.scale.x;
      this.body.velocity.y = 200;
    } else {
      this.body.velocity.y = 0;
    }
  }
}
