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

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);

    this.game.physics.arcade.enable(this);
  }
}
