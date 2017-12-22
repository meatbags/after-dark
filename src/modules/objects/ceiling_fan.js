import { LoadFBX } from '../loader';
import { Config } from '../config';

class CeilingFan {
  constructor() {
    this.group = new THREE.Group();

    // load model
    LoadFBX(Config.file.objectPath + 'ceiling_fan.fbx', new THREE.ShaderMaterial(THREE.DepthShader)).then((meshes) => {
      meshes.forEach((mesh) => { this.group.add(mesh); });
    }, (err) => { throw(err); });

    this.group.position.set(0, 2.5, 2.5);
  }

  update(delta) {
    this.group.rotation.y += delta * Math.PI * 0.125;
  }
}

export default CeilingFan;
