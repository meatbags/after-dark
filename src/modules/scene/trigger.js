import { Config } from '../config';
import { Text } from '../objects';

const TYPE_TRIGGER = 'TYPE_TRIGGER';

class Trigger {
  constructor(position, radius) {
    this.type = TYPE_TRIGGER;

    // interactivity
    this.position = position;
    this.radius = radius;
    this.active = false;
    this.triggered = false;
    this.interactive = true;
    this.timeout = {
      active: false,
      time: 0,
      maxTime: 0
    };

    // mesh
    this.group = new THREE.Group();
    this.text = new Text('e)', this.position);
    this.group.position.set(position.x, position.y, position.z);
  }

  interact() {
    // interact with object

    if (this.active && !this.triggered) {
      this.triggered = true;
      this.onInteract();

      // set timer
      if (this.timeout.active) {
        this.timeout.time = this.timeout.maxTime;
      }
    }
  }

  update(delta, player, camera) {
    // trigger events and set state

    if (this.position.distanceTo(player.position) <= this.radius) {
      if (!this.active) {
        this.active = true;

        if (this.onEnter) {
          this.onEnter();
        }
      }
    } else {
      if (this.active) {
        this.active = false;

        if (this.onExit) {
          this.onExit();
        }
      }
    }

    // decrease timer
    if (this.timeout.active && this.timeout.time > 0) {
      this.timeout.time -= delta;

      if (this.timeout.time <= 0) {
        this.triggered = false;
      }
    }

    // draw text
    this.text.update(delta, camera);
  }

  setTimeout(time) {
    // set triggered event timeout

    this.timeout.active = true;
    this.timeout.maxTime = time;
  }

  setOnEnter(event) {
    // set player enter event

    this.onEnter = event;
  }

  setOnExit(event) {
    // set player exit event

    this.onExit = event;
  }

  setOnInteract(event) {
    // set player interaction event

    this.onInteract = event;
  }
}

export default Trigger;
