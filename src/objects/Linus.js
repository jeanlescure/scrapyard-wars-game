import {Playable} from './Playable';
/**
 * Setup and control player 1 (8-bit Linus Sebastian) sprite.
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
    super(game, x, y);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);
  }
}
