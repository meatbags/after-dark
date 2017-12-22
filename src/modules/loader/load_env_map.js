const LoadEnvMap = (path) => {
  // load environment map

  const envMap = new THREE.CubeTextureLoader().load([
    `${path}/posx.jpg`,
    `${path}/negx.jpg`,
    `${path}/posy.jpg`,
    `${path}/negy.jpg`,
    `${path}/posz.jpg`,
    `${path}/negz.jpg`
  ]);

  return envMap;
};

export default LoadEnvMap;
