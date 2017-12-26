import Room from './room';
import { Entrance } from './entrance';
import { Door, CeilingFan } from '../objects';

class RoomLoader {
  constructor(changeRoom) {
    // events

    this.changeRoom = changeRoom;
  }
  
  load(index) {
    // load a room

    // helper
    const v  = (x, y, z) => { return new THREE.Vector3(x, y, z); };

    switch (index) {
      case 0: {
        const room = new Room('R0', 'test_room.fbx', false, this.onLeaveRoom);

        room.add(
          new Door(v(1.4, 0, -3.9), {angle: 0, clockwise: false, locked: true}),
          new Door(v(-3.9, 0, 1.4), {angle: -Math.PI/2, clockwise: true}),
          new Entrance(v(1.85, 0, -3.9), v(0, 0, 0.5), 'R0_E0', 'R1', 'R1_E0', this.changeRoom)
        );

        //new CeilingFan()
        //const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
        //pointLight.position.set(0, 5, 0);

        return room;
      }
      case 1: {
        const room = new Room('R1', false, false, this.onLeaveRoom);

        room.add(new Entrance(v(0, 0, 0), v(0, 0, 0), 'R1_E0', 'R0', 'R0_E0', this.changeRoom));
        room.group.add(
          new THREE.Mesh(new THREE.BoxBufferGeometry(10, 0.1, 10), new THREE.MeshPhongMaterial({})),
        );

        return room;
      }
      default:
        break;
    }
  }
}

export default RoomLoader;
