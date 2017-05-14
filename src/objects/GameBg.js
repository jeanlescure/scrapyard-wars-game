import {WIDTH, HEIGHT} from '../Constants';

/**
 * Setup and control game background.
 */
export default class GameBg extends Phaser.Image {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y}) {
    super(game, x, y, 'game-bg');

    // Add the image to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0, 0);
    this.width = WIDTH;
    this.height = HEIGHT;
  }
}
