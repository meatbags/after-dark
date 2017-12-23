import { Config } from '../config';
import { OrthoToScreen } from '../maths';

class Text {
  constructor(text, position) {
    this.targetText = text;
    this.text = text;
    this.position = position;
    this.screen = new THREE.Vector3();
    this.context = document.getElementById(Config.renderer.ui.elementID).getContext('2d');
  }

  setText(text) {
    // set new target text

    this.targetText = text;
    this.text = text;
  }

  animateIn() {

  }

  animateOut() {

  }

  update(delta, camera) {
    // get screen coordinates

    OrthoToScreen(this.position, camera, this.screen);
    this.draw();
  }

  draw() {
    // draw text

    this.context.fillText(this.text, this.screen.x, this.screen.y);
  }
}

export default Text;
