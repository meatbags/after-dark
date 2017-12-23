import { Keyboard } from '../input';
import { Config } from '../config';

class Player {
  constructor(onEvent) {
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

    // events, interaction
    this.keyboard = new Keyboard();
    this.keys = this.keyboard.keys;
    this.onEvent = onEvent;

    // model
    this.group = new THREE.Group();
    this.group.add(new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.5, 0.1, 0.5),
      new THREE.ShaderMaterial(THREE.DepthShader)
      //new THREE.MeshPhongMaterial({color: 0xff0000})
    ));

    //this.interaction = new Collider.Interaction(this.target.position, this.target.rotation, this.target.motion);
  }

  update(delta) {
    this.motion.x = ((this.keys.a) ? -1 : 0) + ((this.keys.d) ? 1 : 0);
    this.motion.z = ((this.keys.w) ? -1 : 0) + ((this.keys.s) ? 1 : 0);
    if (this.motion.x != 0 && this.motion.z != 0) {
      this.motion.normalize();
    }
    this.motion.multiplyScalar(this.config.speed * delta);
    this.target.position.add(this.motion);
    this.position.x += (this.target.position.x - this.position.x) * this.config.adjustFactor;
    this.position.z += (this.target.position.z - this.position.z) * this.config.adjustFactor;
    this.group.position.set(this.position.x, this.position.y, this.position.z);

    // interaction
    if (this.keys.e) {
      this.keyboard.forceUp('e');
      this.onEvent();
    }
  }
}

export default Player;
