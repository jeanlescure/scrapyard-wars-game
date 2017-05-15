import _ from 'lodash';
import BaseState from './BaseState';
import GameBg from '../objects/GameBg';
import ScoreTracker from '../objects/ScoreTracker';
import PartsTracker from '../objects/PartsTracker';
import ConveyorBelt from '../objects/ConveyorBelt';
import Linus from '../objects/Linus';
import ComputerPart from '../objects/ComputerPart';
import {WIDTH, HEIGHT, PART_TYPES} from '../Constants';

/**
 * Setup and display the main game state.
 */
export default class Main extends BaseState {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Generate this match's goal.
    this.generateGoal();
    this.game.world.store.match.started = true;

    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.input.activePointer.capture = true;

    this.gameBg = new GameBg({
      game: this.game,
      x: 0,
      y: 0,
    });

    this.scoreTracker = new ScoreTracker({
      game: this.game,
      parent: this.game.world,
      name: 'score-tracker-group',
    });

    this.partsTracker = new PartsTracker({
      game: this.game,
      parent: this.game.world,
      name: 'parts-tracker-group',
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

    this.computerParts = [];
    this.addComputerPart();

    this.addUpdateable(this.scoreTracker);
    this.addUpdateable(this.partsTracker);
    this.addUpdateable(this.conveyorBelt);
    this.addUpdateable(this.playerOne);

    this.game.world.store.howlManager.playSequence(['gameStart', 'gameMusic']);
  }

  /**
   * Generate this match's goal. Done dynamically as to not
   * be affected by future changes in price multipliers
   * and specs of PART_TYPES array.
   *
   * NOTE: No Google used for this one. I know my math well.
   */
  generateGoal() {
    // Map cheapest price for all parts.
    const minPMCollection = _.map(PART_TYPES, (pt) => {
      const minSpec = (pt.hasSpec) ? _(pt.specOptions).sortBy().first() : 1;
      return minSpec * pt.minPriceMultiplier;
    });

    // Map the most expensive price for all parts.
    const maxPMCollection = _.map(PART_TYPES, (pt) => {
      const maxSpec = (pt.hasSpec) ? _(pt.specOptions).sortBy().last() : 1;
      return maxSpec * pt.maxPriceMultiplier;
    });

    // Get the cheapest and most expensive parts, then average them.
    const minPrice = _(minPMCollection).sortBy().first();
    const maxPrice = _(maxPMCollection).sortBy().last();
    const avgPrice = (minPrice + maxPrice) / 2;

    // Our ideal range should start from the average part price
    // up to the max, and also take into account a quotient based
    // on the number of parts needed to be fetched during a match.
    const halfNumOfParts = PART_TYPES.length / 2;
    const goalRange = [
      avgPrice * halfNumOfParts,
      maxPrice * halfNumOfParts,
    ];
    this.game.world.store.match.goal = Math.ceil(_.random(...goalRange));
  }

  /**
   * Add a new computer part to the stage and set timeout to repeat.
   */
  addComputerPart() {
    const computerPart = new ComputerPart({
      game: this.game,
      x: WIDTH + 64,
      y: 25,
    });

    computerPart.body.velocity.x = -150;

    this.addCollisionCheck(computerPart);
    this.computerParts.push(computerPart);
    this.addUpdateable(computerPart);

    this.computerPartTimeout = setTimeout(() => {
      this.addComputerPart();
    }, 1000);
  }

  /**
   * Add the main text to the group.
   * @param {ComputerPart} computerPart The computer part to add collision checking to.
   */
  addCollisionCheck(computerPart) {
    computerPart.collisionCheck = () => {
      // If I've been caught I shouldn't keep checking for collisions.
      if (computerPart && !computerPart.caught) {
        this.game.physics.arcade.collide(this.playerOne, computerPart, () => {
          // I should be caught on Linus' basket, not his head.
          if (computerPart.y > this.playerOne.y - 80) {
            computerPart.caught = true;
            computerPart.falling = false;

            // Store computer part data for score calculation.
            this.game.world.store.match.parts.push(computerPart.meta);

            // I should not keep being checked or updated.
            _.pull(this.computerParts, computerPart);
            this.removeUpdateable(computerPart);

            // I will go out with style
            let tweenArgs = [
              {y: computerPart.y - 25},
              250,
              Phaser.Easing.Sinusoidal.Out,
              true,
            ];
            const tweenY = this.game.add.tween(computerPart).to(...tweenArgs);

            tweenArgs = [
              {alpha: 0},
              200,
              Phaser.Easing.Sinusoidal.Out,
              true,
            ];
            this.game.add.tween(computerPart).to(...tweenArgs);

            tweenArgs = [
              {x: 0.4, y: 0.4},
              200,
              Phaser.Easing.Sinusoidal.Out,
              true,
            ];
            this.game.add.tween(computerPart.scale).to(...tweenArgs);

            // Ok, ciao
            tweenY.onComplete.add(() => {
              setTimeout(() => {
                computerPart.destroy();
              }, 10);
            }, this);
          }
        });
      }

      if (computerPart && (computerPart.y > HEIGHT + 64 || computerPart.x < -64)) {
        // I should not keep being checked or updated.
        _.pull(this.computerParts, computerPart);
        this.removeUpdateable(computerPart);
        computerPart.destroy();
      }
    };
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    BaseState.update.call(this);

    const cps = this.computerParts.length;
    _.each(this.computerParts, (cp) => {
      cp.collisionCheck();
      if (this.computerParts.length !== cps) {
        return false;
      }
      return true;
    });

    if (this.game.world.store.match.ended) {
      clearTimeout(this.computerPartTimeout);

      this.game.world.store.howlManager.stopHowl('gameMusic');
      this.game.state.start('Scoreboard');
    }
  }
}
