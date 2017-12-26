import Trigger from './trigger';
import { Config, SharedGeometry } from '../config';
import { MinAngleBetween } from '../maths';
import Text from './text';

const TYPE_DOOR = 'TYPE_DOOR';

class Door {
  constructor(position, params) {
    this.type = TYPE_DOOR;
    this.interactive = true;
    this.config = Config.objects;

    // create object
    this.group = new THREE.Group();
    SharedGeometry.registerGroup(this.group, 'door');
    this.group.position.set(position.x, position.y, position.z);
    this.angle = this.target = this.group.rotation.y = (params.angle) ? params.angle : 0;

    // trigger
    const extend = new THREE.Vector3(position.x + Math.cos(this.angle) * 0.45, position.y, position.z - Math.sin(this.angle) * 0.45);
    this.trigger = new Trigger(extend, this.config.defaultRadius);

    // props
    this.clockwise = (params.clockwise) ? params.clockwise : false;
    this.open = false;
    this.locked = false;
    this.ajar = true;
    this.angleClosed = this.angle;
    this.angleAjar = (this.clockwise) ? this.angle - Math.PI * 0.15 : this.angle + Math.PI * 0.15;
    this.angleOpen = (this.clockwise) ? this.angle - Math.PI * 0.5 : this.angle + Math.PI * 0.5;

    // initial state
    if (params.locked != undefined) {
      this.setLocked(params.locked);
    }

    // text prompt
    this.text = new Text('', extend, {x:-12});

    // logic
    this.trigger.setOnEnter(() => {
      if (this.ajar && !this.open) {
        this.target = this.angleAjar;
        this.text.setText('e = open');
      }
    });
    this.trigger.setOnExit(() => {
      if (this.ajar && !this.open) {
        this.target = this.angleClosed;
        this.text.setText('');
      }
    });
    this.trigger.setOnInteract(() => {
      if (!this.locked && !this.open) {
        this.open = true;
        this.target = this.angleOpen;
        this.text.setText('');
      }
    })
  }

  interact() {
    this.trigger.interact();
  }

  setLocked(locked) {
    this.locked = locked;
  }

  setAjar(ajar) {
    this.ajar = ajar;
  }

  update(delta, player, camera) {
    // adjust angle
    if (this.angle != this.target) {
      const delta = MinAngleBetween(this.angle, this.target);

      if (Math.abs(delta) > this.config.adjustThreshold) {
        this.angle += delta * this.config.adjustFactor;
      } else {
        this.angle = this.target;
      }

      this.group.rotation.y = this.angle;
    }

    // update trigger
    this.trigger.update(delta, player, camera);

    // update text
    this.text.update(delta, camera);
  }
}

export default Door;
