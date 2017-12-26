import RoomLoader from './room_loader';

class RoomHandler {
  constructor(scene, player, camera, onLoad) {
    // set up
    this.setMethods();

    // events
    this.onLoad = onLoad;

    // targets
    this.scene = scene;
    this.player = player;
    this.camera = camera;

    // rooms
    this.rooms = [];
    this.roomLoader = new RoomLoader(this.changeRoom);
    this.rooms.push(this.roomLoader.load(0), this.roomLoader.load(1));

    // set room
    this.currentRoom = this.rooms[0];
    this.scene.add(this.currentRoom.group);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  }

  setMethods() {
    // methods

    this.interact = () => { this.currentRoom.interact(); };
    this.changeRoom = (roomId, entranceId) => {
      // get targets
      const nextRoom = this.getRoomById(roomId);
      const entrance = nextRoom.getObjectById(entranceId);

      // loading screen
      this.onLoad(false);

      setTimeout(() => {
        // rm room from scene, swap room
        this.scene.remove(this.currentRoom.group);
        this.currentRoom = nextRoom;

        // set player/ camera positions
        entrance.enter(this.player, this.camera);

        // add new group
        this.scene.add(this.currentRoom.group);

        // rm loading screen
        this.onLoad(true);
      }, 500);
    };
  }

  getRoomById(id) {
    // get room

    for (let i=0; i<this.rooms.length; i++) {
      if (this.rooms[i].id == id) {
        return this.rooms[i];
      }
    }

    return null;
  }

  update(delta) {
    // update

    this.currentRoom.update(delta, this.player, this.camera);
  }
}

export default RoomHandler;
