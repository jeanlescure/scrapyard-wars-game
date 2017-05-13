/**
 * Setup the pre-game boot sequence.
 */
export default class Boot extends Phaser.State {
  /**
   * Preload any assets needed for the preload state.
   */
  preload() {
    this.game.this = true;
  }

  /**
   * Setup anything that is needed before the preload state begins.
   */
  create() {
    // Scale the game to fill the entire page.
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Don't pause the game on blur.
    this.game.stage.disableVisibilityChange = true;
    this.game.stage.smoothed = false;
    this.game.renderer.renderSession.roundPixels = false;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // Disable clearing the canvas on each tick (usually not needed).
    this.game.clearBeforeRender = false;

    // Move on to the preload state.
    this.game.state.start('Preload');
  }
}
