import { Scene } from './scene';
import { Renderer } from './render';

class Master {
  constructor() {
    this.scene = new Scene();
    this.renderer = new Renderer(this.scene.getScene(), this.scene.getCamera());

    // init
    this.scene.init();

    // run
    this.fps = 1000 / 30;
    this.paused = false;
    this.time = (new Date()).getTime();
    this.age = 0;
  }

  loop() {
    if (!this.paused) {
      setTimeout(() => {
        requestAnimationFrame(() => { this.loop(); });
      }, this.fps);

      // timing
      const now = (new Date()).getTime();
      const delta = (now - this.time) / 1000;
      this.time = now;
      this.age += delta;

      // update
      this.renderer.clearUI();
      this.scene.update(delta);
      this.renderer.render(delta);
    }
  }
}

export default Master;
