/**
 * Setup button group.
 */
export default class Button extends Phaser.Group {
  /**
    * Constructor.
    * @param {{
    *    game: Phaser.game,
    *    parent: Phaser.DisplayObject,
    *    name: String,
    *    textString: String,
    *    inputDownCallback: Function,
    *    inputUpCallback: Function,
    *    options: Object
    * }} dobj Destructured arguments object.
    */
  constructor({game, parent, name, textString, inputDownCallback, inputUpCallback}) {
    super(game, parent, name);

    this.text = null;

    this.inputEnableChildren = true;
    this.onChildInputDown.add(inputDownCallback, this);
    this.onChildInputUp.add(inputUpCallback, this);

    const buttonBg = new Phaser.Image(this.game, 0, 0, 'button', 0);
    this.add(buttonBg);

    this.addText(textString);
    this.scale.x = 0.75;
    this.scale.y = this.scale.x;

    this.parent.add(this);
  }

  /**
   * Add the main text to the group.
   * @param {Number} num The tint color number (e.g. 0xffffff).
   */
  tint(num) {
    this.forEach((c) => {
      c.tint = num;
    }, this);
  }

  /**
   * Change the text.
   * @param {String} textString The text to display on the button.
   */
  changeText(textString) {
    this.text.text = textString;
  }

  /**
   * Add the text to the group.
   * @param {String} textString The text to display on the button.
   */
  addText(textString) {
    const textArgs = [
      this.game,
      this.centerX,
      this.centerY,
      textString,
      {
        font: 'normal 22px Press Start 2P',
        fill: '#ffffff',
      },
    ];
    this.text = new Phaser.Text(...textArgs);
    this.text.anchor.setTo(0.5, 0.5);
    this.add(this.text);
  }
}
