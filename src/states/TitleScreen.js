import throttle from 'lodash.throttle';
import {WIDTH, HEIGHT} from '../Constants';

let marginTopValue;
let marginLeftValue;

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.State {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    const txtArgs = [
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      'TitleScreen',
      {
        font: 'normal 20px Press Start 2P',
        fill: '#ffffff',
      },
    ];

    this.tempText = new Phaser.Text(...txtArgs);
    this.tempText.anchor.setTo(0.5, 0.5);

    this.game.add.existing(this.tempText);

    // ...

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    this.scale.setGameSize(WIDTH, HEIGHT);

    marginTopValue = `-${Math.floor(this.game.canvas.offsetHeight / 2)}px`;
    marginLeftValue = `-${Math.floor(this.game.canvas.offsetWidth / 2)}px`;
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    if (this.game.canvas.style.marginTop !== marginTopValue) {
      window.dispatchEvent(new Event('resize'));
      this.game.canvas.style.marginTop = marginTopValue;
      this.game.canvas.style.marginLeft = marginLeftValue;
    }
    if (this.game.input.activePointer.isDown) {
      this.game.state.start('CharacterSelect');
    }
  }
}
