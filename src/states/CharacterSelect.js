import ShortUniqueId from 'short-unique-id';

import BaseState from './BaseState';
import IntroBg from '../objects/IntroBg';
import CharacterCard from '../objects/CharacterCard';

/**
 * Setup and display the character selection state.
 */
export default class CharacterSelect extends BaseState {
  /**
   * Setup all objects, etc needed for the character selection state.
   */
  create() {
    this.addUpdateable(new IntroBg({
      game: this.game,
      x: 0,
      y: 0,
    }));

    const chooseCharTextArgs = [
      this.game, // game
      this.game.world.centerX, // x
      16, // y
      'SELECT YOUR CHARACTER', // text
      {
        font: 'normal 28px Press Start 2P',
        fill: '#ffffff',
      },
    ];

    this.chooseCharText = new Phaser.Text(...chooseCharTextArgs);
    this.chooseCharText.anchor.setTo(0.5, 0);

    this.game.add.existing(this.chooseCharText);

    this.playerOneCard = new CharacterCard({
      game: this.game,
      charIdx: 0,
      clickCallback: () => {
        const uid = new ShortUniqueId();

        this.game.world.store.player.character = 0;
        this.game.world.store.match.uid = uid.randomUUID(6);

        this.game.world.store.howlManager.playHowl('selected');
        this.HideCharacterCards();
      },
    });

    this.playerTwoCard = new CharacterCard({
      game: this.game,
      charIdx: 1,
      clickCallback: function clickCallback() {
        // ...
      },
    });
  }

  /**
   * Hide character cards.
   */
  HideCharacterCards() {
    this.playerOneCard.visible = false;
    this.playerTwoCard.visible = false;
  }

  /**
   * Handle actions in the character selection loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
