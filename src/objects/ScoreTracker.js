/**
 * Setup score tracker group.
 */
export default class ScoreTracker extends Phaser.Group {
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

    this.addGoalText();
  }

  /**
   * Adds the goal text.
   */
  addGoalText() {
    const goalTextArgs = [
      this.game,
      5,
      64,
      `Goal: $${this.game.world.store.match.goal}`,
      {
        font: 'normal 18px PT Mono',
        fill: '#ffffff',
        stroke: 0x000000,
        strokeThickness: 4,
      },
    ];
    this.goalText = new Phaser.Text(...goalTextArgs);
    this.game.add.existing(this.goalText);
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    const goal = this.game.world.store.match.goal;
    const score = this.game.world.store.match.score;
    if (goal < score) {
      this.goalText.fill = 0xE50000;
    }
  }
}
