import { Config } from '../config';

class Camera {
  constructor() {
    this.config = Config.camera;

    // camera
    this.size = this.config.size;
    this.width = this.config.size * (Config.renderer.width / Config.renderer.height);
    this.height = this.config.size;
    this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, this.config.near, this.config.far);
    this.camera.updateProjectionMatrix();

    // screen centre
    this.screen = {
      width: Config.renderer.width,
      height: Config.renderer.height,
      ratio: Config.renderer.width / Config.renderer.height,
      centre: {
        x: Config.renderer.width / 2,
        y: Config.renderer.height / 2
      },
    };

    // position camera
    this.position = new THREE.Vector3(0, 0, 0);
    this.camera.position.set(this.config.position.x, this.config.position.y, this.config.position.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  onScreen(x, y) {
    // check if screen x y are on screen

    return (x >= 0 && y >= 0 && x <= this.screen.width && y <= this.screen.height);
  }

  resize(width, height) {
    // resize camera

    this.screen.width = width;
    this.screen.height = height;
    this.screen.centre.x = width / 2;
    this.screen.centre.y = height / 2;
    this.screen.ratio = width / height;
  }

  update(player) {
    // move

    this.position.x += (player.position.x - this.position.x) * this.config.adjustFactor;
    this.position.y += (player.position.y - this.position.y) * this.config.adjustFactor;
    this.position.z += (player.position.z - this.position.z) * this.config.adjustFactor;
    this.camera.position.set(
      this.position.x + this.config.position.x,
      this.position.y + this.config.position.y,
      this.position.z + this.config.position.z
    );
  }

  setPosition(position) {
    // set position

    this.position.set(position.x, position.y, position.z);
  }
}

export default Camera;
