const Config = {
  file: {
    assetPath: 'assets/',
    objectPath: 'assets/objects/',
    roomPath: 'assets/rooms/'
  },
  camera: {
    position: {
      x: 15,
      y: 20,
      z: 20
    },
    inverseScale: 150,
    near: 1,
    far: 1000,
  },
  renderer: {
    width: 1200,
    height: 600,
    bloom: {
      strength: 1.0,
      radius: 1.0,
      threshold: 0.7
    }
  }
};

export default Config;
