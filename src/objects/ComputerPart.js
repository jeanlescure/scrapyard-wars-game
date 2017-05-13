import {Playable} from './Playable';
import {PART_TYPES} from '../Constants';
/**
 * Setup and control computer part.
 */
export default class ComputerPart extends Playable {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer,
   *    partTypeIdx: (integer|undefined)
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y, partTypeIdx}) {
    const partType = PART_TYPES[(partTypeIdx || 0)];
    super(game, x, y, partType.frame);

    this.partType = partType;

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);
  }
}
