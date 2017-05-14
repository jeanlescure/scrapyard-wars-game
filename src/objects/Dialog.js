import _ from 'lodash';
import 'canvasinput/CanvasInput.min';
import Button from './Button';
import {WIDTH, HEIGHT, DIALOG_DEFAULT_OPTIONS} from '../Constants';

/**
 * Setup dialog group.
 */
export default class Dialog extends Phaser.Group {
  /**
    * Constructor.
    * @param {{
    *    game: Phaser.game,
    *    parent: Phaser.DisplayObject,
    *    name: String,
    *    options: Object
    * }} dobj Destructured arguments object.
    */
  constructor({game, parent, name, options}) {
    super(game, parent, name);

    this.defaultOptions = DIALOG_DEFAULT_OPTIONS;

    this.options = _.extend({}, this.defaultOptions, options);

    this.buttons = [];

    this.x = 0;
    this.y = 0;
    this.width = WIDTH;
    this.height = HEIGHT;

    const dialogBg = new Phaser.Image(this.game, 0, 0, 'dialog-bg', 0);
    dialogBg.y = 44;
    this.add(dialogBg);

    this.addMainText();

    if (!this.options.hasInput) {
      this.addSecondaryText();
    } else {
      this.createInput(this.centerX, this.centerY - 10);
    }

    _.each(this.options.buttonStates, (buttonState) => {
      this.addButton(buttonState);
    });
    this.positionButtons();

    this.visible = false;

    this.game.add.existing(this);

    this.alignIn(this.game.world, Phaser.TOP_CENTER);
  }

  /**
   * Change the text.
   * @param {Number} x The x position.
   * @param {Number} y The y position.
   */
  createInput(x, y) {
    const bmd = this.game.add.bitmapData(250, 40);
    this.input = new Phaser.Sprite(this.game, x, y, bmd);

    const input = this.input;

    input.anchor.setTo(0.5, 0.5);
    this.add(input);

    /* eslint-disable no-undef */
    input.canvasInput = new CanvasInput({
      canvas: bmd.canvas,
      fontSize: 18,
      fontFamily: 'PT Mono',
      fontColor: '#212121',
      fontWeight: 'bold',
      width: 230,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 3,
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
    });
    /* eslint-enable no-undef */
    input.inputEnabled = true;
    input.input.useHandCursor = true;
    input.events.onInputUp.add(() => {
      input.canvasInput.focus();
    });
  }

  /**
   * Move the button(s) to the right position.
   */
  positionButtons() {
    if (this.options.buttonStates.length === 1) {
      this.buttons[0].alignIn(this, Phaser.BOTTOM_CENTER, 0, -18);
    } else if (this.options.buttonStates.length === 2) {
      this.buttons[0].alignIn(this, Phaser.BOTTOM_CENTER, -100, -18);
      this.buttons[1].alignIn(this, Phaser.BOTTOM_CENTER, 100, -18);
    }
  }

  /**
    * Add a button to the group.
    * @param {{
    *   textString: String,
    *   inputDownCallback: Function,
    *   inputUpCallback: Function
    * }} dobj Destructured arguments object.
    */
  addButton({textString, inputDownCallback, inputUpCallback}) {
    this.buttons.push(new Button({
      game: this.game,
      parent: this,
      name: `button${this.buttons.length}`,
      textString,
      inputDownCallback,
      inputUpCallback,
    }));
    this.add(_.last(this.buttons));
  }

  /**
   * Add the main text to the group.
   */
  addMainText() {
    const mainTextArgs = [
      this.game,
      0,
      0,
      this.options.mainTextString,
      {
        font: 'normal 24px PT Mono',
        fill: '#ffffff',
        align: 'center',
      },
    ];
    const mainText = new Phaser.Text(...mainTextArgs);
    mainText.alignIn(this, Phaser.TOP_CENTER, 0, -20);
    this.add(mainText);
  }

  /**
   * Add the secondary text to the group.
   */
  addSecondaryText() {
    const secondaryTextArgs = [
      this.game,
      0,
      0,
      this.options.secondaryTextString,
      {
        font: 'normal 16px Press Start 2P',
        fill: '#ffffff',
        align: 'center',
      },
    ];
    const secondaryText = new Phaser.Text(...secondaryTextArgs);
    secondaryText.alignIn(this, Phaser.TOP_CENTER, 0, -60);
    this.add(secondaryText);
  }
}
