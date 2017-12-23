import { Config } from '../config';

class Text {
  constructor(text, position) {
    this.targetText = text;
    this.text = text;
    this.position3D = position;
    this.position2D = new THREE.Vector2(100, 100);
    this.context = document.getElementById(Config.renderer.ui.elementID).getContext('2d');
  }

  setText(text) {
    // set new target text

    this.targetText = text;
  }

  animateIn() {

  }

  animateOut() {

  }

  update(delta, camera) {


    this.draw();
  }

  draw() {
    // draw text

    this.context.fillText(this.text, this.position2D.x, this.position2D.y);
  }
}

export default Text;
