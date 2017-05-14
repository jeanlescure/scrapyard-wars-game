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

    this.inputEnableChildren = true;
    this.onChildInputDown.add(inputDownCallback, this);
    this.onChildInputDown.add(inputUpCallback, this);

    const buttonBg = new Phaser.Image(this.game, 0, 0, 'button', 0);
    this.add(buttonBg);

    this.addText(textString);
    this.scale.x = 0.75;
    this.scale.y = this.scale.x;

    this.parent.add(this);
  }

  /**
   * Add the main text to the group.
   * @param {String} textString The text to display on the button.
   */
  addText(textString) {
    const textArgs = [
      this.game,
      0,
      0,
      textString,
      {
        font: 'normal 30px Press Start 2P',
        fill: '#ffffff',
      },
    ];
    const text = new Phaser.Text(...textArgs);
    text.alignIn(this, Phaser.CENTER);
    this.add(text);
  }
}
