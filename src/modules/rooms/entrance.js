import { Config } from '../config';
import { Trigger } from '../objects';

const TYPE_ENTRANCE = 'TYPE_ENTRANCE';

class Entrance {
  // interactive entrance

  constructor(position, offset, id, targetRoom, targetEntrance, onInteract) {
    this.type = TYPE_ENTRANCE;
    this.interactive = true;
    this.config = Config.objects;

    // props
    this.id = id;
    this.position = position;
    this.offset = offset;
    this.playerPosition = new THREE.Vector3(this.position.x + this.offset.x, this.position.y + this.offset.y, this.position.z + this.offset.z);
    this.targetRoom = targetRoom;
    this.targetEntrance = targetEntrance;
    this.onInteract = onInteract;

    // trigger
    this.trigger = new Trigger(this.position, this.config.defaultRadius);
    this.trigger.setOnInteract(() => {
      this.onInteract(this.targetRoom, this.targetEntrance);
    });
    this.trigger.setTimeout(1);
    this.trigger.triggerTimeout();
  }

  interact() {
    // trigger room change

    this.trigger.interact();
  }

  update(delta, player, camera) {
    // update trigger

    this.trigger.update(delta, player, camera);
  }

  enter(player, camera) {
    // set player & camera position
    
    player.setPosition(this.playerPosition);
    camera.setPosition(this.playerPosition);
  }
}

export { Entrance, TYPE_ENTRANCE };
