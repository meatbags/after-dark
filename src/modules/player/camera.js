import { Config } from '../config';

class Camera {
  constructor() {
    this.config = Config.camera;

    // camera
    const scale = 1 / this.config.inverseScale;
    const w = Config.renderer.width * scale;
    const h = Config.renderer.height * scale;
    this.camera = new THREE.OrthographicCamera(-w, w, h, -h, this.config.near, this.config.far);
    this.camera.updateProjectionMatrix();

    // test
    this.camera.position.set(this.config.position.x, this.config.position.y, this.config.position.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
}

export default Camera;
