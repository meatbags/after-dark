import { Config } from '../config';

class Camera {
  constructor() {
    this.config = Config.camera;

    // camera
    this.width = this.config.size;
    this.height = this.config.size * (Config.renderer.height / Config.renderer.width);
    this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, this.config.near, this.config.far);
    this.camera.updateProjectionMatrix();

    // position camera
    this.position = new THREE.Vector3(0, 0, 0);
    this.camera.position.set(this.config.position.x, this.config.position.y, this.config.position.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  update(player) {
    // set new position

    this.position.x += (player.x - this.position.x) * this.config.adjustFactor;
    this.position.y += (player.y - this.position.y) * this.config.adjustFactor;
    this.position.z += (player.z - this.position.z) * this.config.adjustFactor;
    this.camera.position.set(
      this.position.x + this.config.position.x,
      this.position.y + this.config.position.y,
      this.position.z + this.config.position.z
    );
  }
}

export default Camera;
