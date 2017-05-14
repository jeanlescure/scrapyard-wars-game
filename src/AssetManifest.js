// Note: I was unable to load audio with this method,
// it freezes the game on preload.
//
// Skipping audio preload for now.

const AssetManifest = {
  sprites: [
    'intro-bg.png',
    'intro-title.png',
    'playables.png',
    'conveyor-belt.png',
  ],
  images: [
    'game-bg.png',
    'dialog-bg.png',
    'button.png',
    'character-card-linus.png',
    'character-card-luke.png',
  ],
  fonts: {
    google: {
      families: [
        'Press Start 2P',
        'PT Mono',
      ],
    },
  },
};

export default AssetManifest;
