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
    super(game, x, y, width, height, 'conveyor', 0);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0, 0);

    this.animations.add('move', Array.from(Array(64).keys()), 30);
  }
}
