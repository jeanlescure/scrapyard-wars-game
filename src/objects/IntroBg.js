/**
 * Setup and control intro background.
 */
export default class IntroBg extends Phaser.Image {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y}) {
    super(game, x, y, 'intro-bg', 0);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0, 0);
  }
}
