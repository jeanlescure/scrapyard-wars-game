import BaseState from './BaseState';
import GameBg from '../objects/GameBg';
import ConveyorBelt from '../objects/ConveyorBelt';
import Linus from '../objects/Linus';
import {WIDTH, HEIGHT} from '../Constants';

/**
 * Setup and display the main game state.
 */
export default class Main extends BaseState {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.input.activePointer.capture = true;

    this.gameBg = new GameBg({
      game: this.game,
      x: 0,
      y: 0,
    });

    this.conveyorBelt = new ConveyorBelt({
      game: this.game,
      x: 0,
      y: 0,
      width: WIDTH * 2,
      height: 128,
    });

    this.playerOne = new Linus({
      game: this.game,
      x: this.game.world.centerX,
      y: HEIGHT,
    });

    this.addUpdateable(this.conveyorBelt);
    this.addUpdateable(this.playerOne);

    this.game.world.store.howlManager.playSequence(['gameStart', 'gameMusic']);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);
  }
}
