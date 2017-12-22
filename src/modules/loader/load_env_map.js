const LoadEnvMap = (root) => {
  // load environment map

  const envMap = new THREE.CubeTextureLoader().load([
    `${root}/posx.jpg`,
    `${root}/negx.jpg`,
    `${root}/posy.jpg`,
    `${root}/negy.jpg`,
    `${root}/posz.jpg`,
    `${root}/negz.jpg`
  ]);

  return envMap;
};

export default LoadEnvMap;
