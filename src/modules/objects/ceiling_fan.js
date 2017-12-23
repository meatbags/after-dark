import { LoadFBX } from '../loader';
import { Config } from '../config';

class CeilingFan {
  constructor() {
    this.group = new THREE.Group();

    // load model
    LoadFBX(Config.file.objectPath + 'ceiling_fan.fbx', new THREE.ShaderMaterial(THREE.DepthShader)).then((meshes) => {
      meshes.forEach((mesh) => { this.group.add(mesh); });
    }, (err) => { throw(err); });

    // set position
    this.group.position.set(1.5, 2.5, 0);
    this.group.scale.set(1, 1, 1);

    // props
    this.rotationSpeed = Math.PI / 24;
  }

  update(delta) {
    // revolve fan

    this.group.rotation.y += delta * this.rotationSpeed;
  }
}

export default CeilingFan;
