import { Player, Camera } from '../player';
import Room from './room';
import { CeilingFan } from '../objects';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.player = new Player();

    // add player
    this.scene.add(this.player.group);

    // load stuff
    this.loading = true;
    this.room = new Room(this._uid('Room'), 'test_room.fbx', false);
    this.room.add(new CeilingFan);
    this.scene.add(this.room.group);
    this.currentRoom = this.room;

    this.light = {
      p1: new THREE.PointLight(0xffffff, 1, 100, 2),
      a1: new THREE.AmbientLight(0xffffff, 0.2)
    };
    this.light.p1.position.set(0, 11, 0);

    this.scene.add(this.light.p1, this.light.a1);
  }

  isLoading() {
    // check if loading

    return this.loading;
  }

  update(delta) {
    // logic

    this.player.update(delta);
    this.camera.update(this.player.position);
    this.currentRoom.update(delta);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera.camera;
  }

  _uid(prefix) {
    this.uid = (this.uid) ? this.uid + 1 : 1;

    return `${prefix}_${this.uid}`;
  }
}

export default Scene;
