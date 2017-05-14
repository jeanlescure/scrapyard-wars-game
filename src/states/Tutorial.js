import _ from 'lodash';
import BaseState from './BaseState';
import {CHARACTERS} from '../Constants';

/**
 * Setup and display the tutorial game state.
 */
export default class Tutorial extends BaseState {
  /**
   * Setup all objects, etc needed for the tutorial game state.
   */
  create() {
    let tutorialText = '';
    _.each(CHARACTERS[this.game.world.store.player.character].tutorialLines, (line) => {
      tutorialText += `${line}${'\n'}${'\n'}`;
    });

    const mainTextArgs = [
      this.game,
      0,
      0,
      tutorialText,
      {
        font: 'normal 20px PT Mono',
        fill: '#ffffff',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 580,
      },
    ];
    const mainText = new Phaser.Text(...mainTextArgs);
    mainText.alignIn(this.game.world, Phaser.TOP_CENTER, 0, -60);
    this.game.add.existing(mainText);
  }

  /**
   * Handle actions in the tutorial game loop.
   */
  update() {
    BaseState.update.call(this);
  }
}

