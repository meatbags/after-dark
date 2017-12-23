const OrthoToScreen = (position, camera, target) => {
  // convert 3D space to screen space store in target

  target.set(position.x, position.y, position.z);
  target.project(camera.camera);
  target.x = (target.x + 1) * camera.screen.centre.x;
  target.y = (-target.y + 1) * camera.screen.centre.y;
};

export default OrthoToScreen;
