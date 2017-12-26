import { LoadFBX } from '../loader';
import { Config } from '../config';
import { TYPE_ENTRANCE } from './entrance';

class Room {
  constructor(id, map, collision, onLeaveRoom) {
    this.id = id;
    this.onLeaveRoom = onLeaveRoom;
    this.group = new THREE.Group();

    // objects
    this.objects = [];

    // load map
    if (map) {
      this.loadMap(Config.file.roomPath + map);
    }

    // load collision map
    if (collision) {
      this.loadCollisionMap(Config.file.roomPath + collisionMap);
    }
  }

  update(delta, player, camera) {
    // update objects

    for (let i=0; i<this.objects.length; i++) {
      this.objects[i].update(delta, player, camera);
    }
  }

  loadMap(path) {
    // load map meshes

    this.toLoad = (this.toLoad) ? this.toLoad + 1 : 1;
    LoadFBX(path, new THREE.ShaderMaterial(THREE.DepthShader)).then((meshes) => {
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

  add() {
    // add objects

    for (let i=0; i<arguments.length; i++) {
      this.objects.push(arguments[i]);

      // add mesh
      if (arguments[i].group) {
        this.group.add(arguments[i].group);
      }
    }
  }

  interact() {
    // interact with room objects

    for (let i=0; i<this.objects.length; i++) {
      if (this.objects[i].interactive) {
        this.objects[i].interact();
      }
    }
  }

  getObjectById(id) {
    // get object

    for (let i=0; i<this.objects.length; i++) {
      if (this.objects[i].id && this.objects[i].id == id) {
        return this.objects[i];
      }
    }

    return null;
  }
}

export default Room;
