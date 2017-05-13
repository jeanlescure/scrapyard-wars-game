import Stats from 'stats.js';
import Boot from './states/Boot';
import Preload from './states/Preload';
import TitleScreen from './states/TitleScreen';
import CharacterSelect from './states/CharacterSelect';
import Tutorial from './states/Tutorial';
import Main from './states/Main';
import Scoreboard from './states/Scoreboard';
import './assets/css/index.css';
import {ENV} from './Constants';

/**
 * Setup the root class for the whole game.
 */
class Game extends Phaser.Game {
  /**
   * Constructor.
   */
  constructor() {
    // Setup the game's stage.
    super({
      // Landscape mobile size
      width: 667,
      height: 375,
      // Using canvas renderer as WebGL one is glitchy AF
      renderer: Phaser.CANVAS,
      // 8-bit "feel" gets ruined by antialias, keep off!
      antialias: false,
      multiTexture: true,
      enableDebug: ENV === 'development',
    });

    // Avoid `this.`ing all the things
    const state = this.state;

    // Setup the different game states.
    state.add('Boot', Boot, false);
    state.add('Preload', Preload, false);
    state.add('TitleScreen', TitleScreen, false);
    state.add('CharacterSelect', CharacterSelect, false);
    state.add('Tutorial', Tutorial, false);
    state.add('Main', Main, false);
    state.add('Scoreboard', Scoreboard, false);
  }

  /**
   * Start the game.
   */
  start() {
    // Kick things off with the boot state.
    this.state.start('Boot');

    // Handle debug mode.
    if (ENV === 'development') {
      this.setupStats();
    }
  }

  /**
   * Display the FPS and MS using Stats.js.
   */
  setupStats() {
    // Setup the new stats panel.
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // Monkey-patch the update loop so we can track the timing.
    const updateLoop = this.update;
    this.update = (...args) => {
      stats.begin();
      updateLoop.apply(this, args);
      stats.end();
    };
  }
}

const game = new Game();
game.start();
