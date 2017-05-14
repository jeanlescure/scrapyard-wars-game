/**
 * Setup and control playable sprite.
 */
export default class Playable extends Phaser.Sprite {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer,
   *    frame: (integer|undefined)
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y, frame}) {
    super(game, x, y, 'playables', (frame || 0));

    this.destinationX = x;
    this.destinationY = y;

    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
  }
}
