import _ from 'lodash';
import Playable from './Playable';
import {PART_TYPES} from '../Constants';

/**
 * Setup and control a computer part sprite.
 */
export default class ComputerPart extends Playable {
  /**
   * Constructor.
   * @param {{
   *    game: Phaser.game,
   *    x: integer,
   *    y: integer
   * }} dobj Destructured arguments object.
   */
  constructor({game, x, y}) {
    const partType = _.sample(PART_TYPES);
    super({game, x, y, frame: partType.frame});

    this.partType = partType;
    this.falling = false;
    this.caught = false;

    const pmArgs = [
      this.partType.minPriceMultiplier,
      this.partType.maxPriceMultiplier,
    ];
    this.priceMultiplier = _.random(...pmArgs);

    this.spec = _.sample(this.partType.specOptions) || 1;

    this.price = Math.ceil(this.priceMultiplier * this.spec);

    this.meta = {
      name: this.partType.name,
      price: this.price,
    };

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);

    this.addPriceText();
    this.addSpecText();

    this.scale.x = 0.375;
    this.scale.y = this.scale.x;

    this.inputEnabled = true;
    this.input.enableDrag();
    this.events.onDragStart.add(() => {
      this.tint = 0xff5500;
      this.scale.x = 0.5;
      this.scale.y = this.scale.x;
      this.body.velocity.x = 0;
      // Add this part's price to the score as soon as touched.
      this.game.world.store.match.score += this.price;
    }, this);
    this.events.onDragStop.add(() => {
      this.tint = 0xffffff;
      this.falling = true;
      this.input.draggable = false;
    }, this);
  }

  /**
   * Adds the price text.
   */
  addPriceText() {
    const priceTextArgs = [
      this.game,
      0,
      0,
      `$${this.price}`,
      {
        font: 'normal 13px PT Mono',
        fill: '#ffffff',
        stroke: 0x000000,
        strokeThickness: 4,
      },
    ];
    this.priceText = new Phaser.Text(...priceTextArgs);
    this.game.add.existing(this.priceText);
  }

  /**
   * Adds the spec text.
   */
  addSpecText() {
    let specString = `${this.partType.specPrefix}${this.spec}${this.partType.specSuffix}`;
    if (!this.partType.hasSpec) {
      specString = '';
    }

    const specTextArgs = [
      this.game,
      0,
      0,
      specString,
      {
        font: 'normal 11px PT Mono',
        fill: '#ffffff',
        stroke: 0x000000,
        strokeThickness: 3,
      },
    ];
    this.specText = new Phaser.Text(...specTextArgs);
    this.game.add.existing(this.specText);
  }

  /**
   * On destroy.
   */
  destroy() {
    this.priceText.destroy();
    this.specText.destroy();
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    if (this.falling) {
      this.scale.x = 0.3;
      this.scale.y = this.scale.x;
      this.body.velocity.y = 200;
    } else {
      this.body.velocity.y = 0;
    }

    this.priceText.alignTo(this, Phaser.LEFT_CENTER, -20, 0);
    this.specText.alignTo(this, Phaser.BOTTOM_RIGHT, 10, -12);
  }
}
