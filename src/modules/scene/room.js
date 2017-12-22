import { LoadFBX } from '../loader';
import { Config } from '../config';

class Room {
  constructor(id, map, collisionMap) {
    this.id = id;
    this.objects = [];
    if (map) {
      this.loadMap(Config.file.assetPath + map);
    }
    if (collisionMap) {
      this.loadCollisionMap(Config.file.assetPath + collisionMap);
    }
  }

  loadMap(path) {
    // load map meshes

    this.toLoad = (this.toLoad) ? this.toLoad + 1 : 1;
    this.group = new THREE.Group();
    const mat = new THREE.ShaderMaterial(THREE.DepthShader);
    LoadFBX(path, mat).then((meshes) => {
      this.toLoad -= 1;
      meshes.forEach((mesh) => {
        this.group.add(mesh)
      });
    }, (err) => { throw(err); });
  }

  loadCollisionMap(path) {
    // load collision map

    this.toLoad = (this.toLoad) ? this.toLoad + 1 : 1;
    this.collider = new Collider.System();
    LoadFBX(path).then((meshes) => {
      this.toLoad -= 1;
      meshes.forEach((mesh) => {
        this.collider.add(new Collider.Mesh(mesh));
      });
    }, (err) => { throw(err); });
  }

  isLoading() {
    // check if loading

    return (this.toLoad == 0);
  }

  add(object) {
    // add object

    this.objects.push(object);
  }

  update(delta) {
    // update objects

    for (let i=0; i<this.objects.length; i++) {
      this.objects[i].update(delta);
    }
  }
}

export default Room;
