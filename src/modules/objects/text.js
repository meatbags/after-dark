import { Config } from '../config';
import { OrthoToScreen } from '../maths';

class Text {
  constructor(text, position, options) {
    this.text = '';
    this.targetText = text;
    this.config = Config.text;

    // props
    this.animate = true;
    this.time = 0;
    this.maxTime = this.config.interval;
    this.lineOffset = 0;
    this.position = position;
    this.screen = new THREE.Vector3();
    this.screenOffset = {
      x: (options) ? ((options.x) ? options.x : this.config.defaultOffset.x) : this.config.defaultOffset.x,
      y: (options) ? ((options.y) ? options.y : this.config.defaultOffset.y) : this.config.defaultOffset.y,
    };

    // dom
    this.context = document.getElementById(Config.renderer.ui.elementID).getContext('2d');
  }

  setText(text) {
    // set new target text

    this.animate = true;
    this.targetText = text;
  }

  animateOut() {
    this.setText('');
  }

  removeLastLetter() {
    // remove last letter of text

    this.text = this.text.substr(0, Math.max(0, this.text.length - 1));
  }

  addNextLetter() {
    // add next letter from target

    this.text += this.targetText[this.text.length];
  }

  update(delta, camera) {
    // animate text

    if (this.animate) {
      if (this.text != this.targetText) {
        this.time += delta;

        if (this.time > this.maxTime) {
          this.time -= this.maxTime;

          // animate
          if (this.text.length >= this.targetText.length) {
            this.removeLastLetter();
          } else {
            let identical = true;

            for (let i=0; i<this.text.length; i++) {
              if (this.text[i] != this.targetText[i]) {
                identical = false;
                break;
              }
            }

            if (!identical) {
              this.removeLastLetter();
            } else {
              this.addNextLetter();
            }
          }
        }
      } else {
        this.animate = false;
      }
    }

    // get screen coordinates
    OrthoToScreen(this.position, camera, this.screen);
    this.draw();
  }

  draw() {
    // draw text

    if (this.text.includes('\n')) {
      const lines = this.text.split('\n');
      const target = (lines.length - 1) * -this.config.lineHeight;
      this.lineOffset += (target - this.lineOffset) * this.config.adjustFactor;

      for (let i=0; i<lines.length; i++) {
        this.context.fillText(lines[i], this.screen.x + this.screenOffset.x, this.screen.y + this.screenOffset.y + this.lineOffset + (i * this.config.lineHeight));
      }
    } else {
      if (this.lineOffset != 0) {
        this.lineOffset += -this.lineOffset * this.config.adjustFactor;
      }
      this.context.fillText(this.text, this.screen.x + this.screenOffset.x, this.screen.y + this.screenOffset.y + this.lineOffset);
    }
  }
}

export default Text;
