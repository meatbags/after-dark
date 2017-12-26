import Config from './config';
import { LoadFBX } from '../loader';

const SharedGeometry = {};

SharedGeometry.geometry = {
  door: null,
};

SharedGeometry.registerGroup = (group, key) => {
  // register group for mesh

  if (SharedGeometry.geometry[key] != null) {
    group.add(SharedGeometry.geometry[key].clone());
  } else {
    // create register
    if (SharedGeometry.register == undefined) {
      SharedGeometry.register = {};
    }

    // create register
    if (SharedGeometry.register[key] == undefined) {
      SharedGeometry.register[key] = [];
    }

    // add to register
    SharedGeometry.register[key].push(group);
  }
};

SharedGeometry.onLoad = () => {
  // load groups from register

  if (SharedGeometry.register != undefined) {
    for (let key in SharedGeometry.register) {
      if (SharedGeometry.register.hasOwnProperty(key)) {
        if (SharedGeometry.geometry[key] != null) {
          for (let i=0; i<SharedGeometry.register[key].length; i++) {
            SharedGeometry.register[key][i].add(SharedGeometry.geometry[key].clone());
          }

          // reset register
          SharedGeometry.register[key] = [];
        }
      }
    }
  }
};

const material = new THREE.ShaderMaterial(THREE.DepthShader);

// load meshes

LoadFBX(Config.file.objectPath + 'door.fbx', material).then((meshes) => {
  meshes.forEach((mesh) => {
    SharedGeometry.geometry.door = mesh;
  });
  SharedGeometry.onLoad();
}, (err) => { throw(err); });

export default SharedGeometry;
