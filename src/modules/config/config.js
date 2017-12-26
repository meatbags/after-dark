const Config = {
  camera: {
    position: {
      x: 20,
      y: 20,
      z: 20
    },
    size: 3,
    near: 1,
    far: 1000,
    adjustFactor: 0.05
  },
  file: {
    assetPath: 'assets/',
    objectPath: 'assets/objects/',
    roomPath: 'assets/rooms/',
    fontPath: 'fonts/regular.typeface.json',
  },
  text: {
    interval: 1 / 24,
    lineHeight: 17,
    defaultOffset: {
      x: 0,
      y: -60,
    },
    adjustFactor: 0.2,
  },
  objects: {
    adjustFactor: 0.2,
    adjustThreshold: 0.01,
    defaultRadius: 1,
  },
  player: {
    height: 2,
    speed: 4,
    adjustFactor: 0.2
  },
  renderer: {
    width: 1280,
    height: 640,
    bloom: {
      strength: 1.0,
      radius: 0.5,
      threshold: 0.8
    },
    ui: {
      elementID: 'ui-canvas',
      zIndex: 99,
      font: '14px Work Sans',
    },
  },
};

export default Config;
