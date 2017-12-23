const Config = {
  camera: {
    position: {
      x: 20,
      y: 20,
      z: 20
    },
    size: 8,
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
  font: {
    size: 0.25,
    fineness: 4
  },
  player: {
    height: 2,
    speed: 3,
    adjustFactor: 0.2
  },
  renderer: {
    width: 1200,
    height: 600,
    bloom: {
      strength: 0.5,
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
