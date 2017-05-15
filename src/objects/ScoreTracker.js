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

    this.goal = this.game.world.store.match.goal;
    this.hvGoal = this.goal / 2;
    this.threeQtGoal = (this.goal / 4) * 3;

    this.addGoalText();
    this.addScoreText();
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
   * Adds the score text.
   */
  addScoreText() {
    const scoreTextArgs = [
      this.game,
      5,
      84,
      `Spent: $${this.game.world.store.match.score}`,
      {
        font: 'normal 18px PT Mono',
        fill: '#ffffff',
        stroke: 0x000000,
        strokeThickness: 4,
      },
    ];
    this.scoreText = new Phaser.Text(...scoreTextArgs);
    this.game.add.existing(this.scoreText);
  }

  /**
   * To be called by the parent state's `update()` method.
   */
  updateCallback() {
    const score = this.game.world.store.match.score;
    if (this.hvGoal < score) {
      this.scoreText.fill = '#f5e500';
    }
    if (this.threeQtGoal < score) {
      this.scoreText.fill = '#e5a500';
    }
    if (this.goal < score) {
      this.scoreText.fill = '#e50000';
    }

    this.scoreText.text = `Spent: $${score}`;
  }
}
