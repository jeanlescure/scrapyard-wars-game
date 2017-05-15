import _ from 'lodash';
import changeCase from 'change-case';
import {WIDTH, PART_TYPES} from '../Constants';

/**
 * Setup parts tracker group.
 */
export default class PartsTracker extends Phaser.Group {
  /**
    * Constructor.
    * @param {{
    *    game: Phaser.game,
    *    parent: Phaser.DisplayObject,
    *    name: String
    * }} dobj Destructured arguments object.
    */
  constructor({game, parent, name}) {
    super(game, parent, name);

    this.partsList = _.map(PART_TYPES, (pt) => {
      return pt.name;
    });
    this.texts = [];

    const partsListTextArgs = [
      this.game,
      WIDTH - 2,
      70,
      'PARTS LIST:',
      {
        font: 'normal 14px Press Start 2P',
        fill: '#ffffff',
        stroke: 0x000000,
        strokeThickness: 5,
      },
    ];
    const partsListText = new Phaser.Text(...partsListTextArgs);
    partsListText.anchor.setTo(1, 0);
    this.game.add.existing(partsListText);

    let currentY = 90;
    _.each(this.partsList, (partName) => {
      this.addTrackingText(partName);
      _.last(this.texts).y = currentY;
      currentY += 20;
    });
  }

  /**
   * Adds the part tracking text.
   * @param {String} textString String to place in text.
   */
  addTrackingText(textString) {
    const trackingTextArgs = [
      this.game,
      WIDTH - 5,
      64,
      changeCase.titleCase(textString),
      {
        font: 'normal 16px PT Mono',
        fill: '#ffffff',
        stroke: 0x000000,
        strokeThickness: 4,
      },
    ];
    const trackingText = new Phaser.Text(...trackingTextArgs);
    trackingText.anchor.setTo(1, 0);
    this.texts.push(trackingText);
    this.game.add.existing(trackingText);
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    let totalParts = 0;
    _.each(this.partsList, (pt, i) => {
      if (_.find(this.game.world.store.match.parts, ['name', pt])) {
        this.texts[i].fill = '#BADA55';
        totalParts += 1;
      }
    });

    if (totalParts === this.partsList.length) {
      this.game.world.store.match.ended = true;
    }
  }
}
