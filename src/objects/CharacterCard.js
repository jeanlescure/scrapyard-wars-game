import {CHARACTERS} from '../Constants';
/**
 * Setup and control character selection card.
 */
export default class CharacterCard extends Phaser.Image {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    charIdx: (integer|undefined)
   * }} dobj Destructured arguments object.
   */
  constructor({game, charIdx, clickCallback}) {
    const character = CHARACTERS[(charIdx || 0)];
    super(game, character.x, character.y, character.key, 0);

    this.character = character;

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(...character.anchor);

    // Handle click event.
    this.inputEnabled = true;
    this.events.onInputDown.add(clickCallback, this);
  }
}
