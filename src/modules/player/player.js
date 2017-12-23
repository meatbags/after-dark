import { Keyboard } from '../input';
import { Config } from '../config';

class Player {
  constructor() {
    // player

    this.config = Config.player;
    this.position = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Vector3(0, 0, 0);
    this.motion = new THREE.Vector3(0, 0, 0);
    this.target = {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      motion: new THREE.Vector3(0, 0, 0)
    };
    this.keyboard = new Keyboard();
    this.keys = this.keyboard.keys;
    this.group = new THREE.Group();
    this.group.add(new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.25, 16, 16),
      new THREE.MeshPhongMaterial({emissive: 0xffffff})
    ));

    //this.interaction = new Collider.Interaction(this.target.position, this.target.rotation, this.target.motion);
  }

  update(delta) {
    this.motion.x = ((this.keys.a) ? -this.config.speed : 0) + ((this.keys.d) ? this.config.speed : 0);
    this.motion.z = ((this.keys.w) ? -this.config.speed : 0) + ((this.keys.s) ? this.config.speed : 0);
    this.motion.multiplyScalar(delta);
    this.target.position.add(this.motion);
    this.position.x += (this.target.position.x - this.position.x) * this.config.adjustFactor;
    this.position.z += (this.target.position.z - this.position.z) * this.config.adjustFactor;
    this.group.position.set(this.position.x, this.position.y, this.position.z);
  }
}

export default Player;
