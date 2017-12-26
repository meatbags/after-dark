import { Player, Camera } from '../player';
import { RoomHandler } from '../rooms';
import { CeilingFan, Trigger, Door } from '../objects';

class Scene {
  constructor(onLoad) {
    // events
    this.onLoad = onLoad;

    // set up
    this.scene = new THREE.Scene();
    this.camera = new Camera();
  }

  init() {
    // add player
    this.player = new Player(() => { this.roomHandler.interact(); });
    this.scene.add(this.player.group);

    // load stuff
    this.loading = true;
    this.roomHandler = new RoomHandler(this.scene, this.player, this.camera, this.onLoad);
  }

  isLoading() {
    // check if loading

    return this.loading;
  }

  update(delta) {
    // logic

    this.player.update(delta);
    this.camera.update(this.player);
    this.roomHandler.update(delta);
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
