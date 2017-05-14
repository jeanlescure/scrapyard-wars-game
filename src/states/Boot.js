/**
 * Setup the pre-game boot sequence.
 */
export default class Boot extends Phaser.State {
  /**
   * Preload any assets needed for the preload state.
   */
  preload() {
    this.game.this = true;
    this.game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Gray.js');
  }

  /**
   * Setup anything that is needed before the preload state begins.
   */
  create() {
    // Scale the game to fill the entire page.
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Ensure proper scaling all throughout
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    this.game.stage.smoothed = false;
    this.game.renderer.renderSession.roundPixels = false;

    // Don't pause the game on blur.
    this.game.stage.disableVisibilityChange = true;

    // Disable clearing the canvas on each tick (usually not needed).
    this.game.clearBeforeRender = false;

    // Move on to the preload state.
    this.game.state.start('Preload');
  }
}
