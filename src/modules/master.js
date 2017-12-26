import { Scene } from './scene';
import { Renderer } from './render';
import { LoadingScreen } from './ui';

class Master {
  constructor() {
    // ui
    this.loadingScreen = new LoadingScreen();

    // events
    window.onblur = () => { this.pause(); };
    window.onfocus = () => { this.resume(); };
    this.onLoad = (loaded) => {
      if (loaded) {
        this.loadingScreen.deactivate();
      } else {
        this.loadingScreen.activate();
      }
    };

    // logic
    this.scene = new Scene(this.onLoad);
    this.renderer = new Renderer(this.scene.getScene(), this.scene.getCamera());

    // init
    this.scene.init();

    // timing
    this.fps = 40;
    this.frameInterval = 1. / this.fps;
    this.paused = false;
    this.time = (new Date()).getTime();
    this.age = 0;

    // start
    setTimeout(() => {
      this.loadingScreen.deactivate();
    }, 500);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.time = (new Date()).getTime();
    this.loop();
  }

  loop() {
    if (!this.paused) {
      requestAnimationFrame(() => { this.loop(); });

      // timing
      const now = (new Date()).getTime();
      const delta = (now - this.time) / 1000;

      if (delta >= this.frameInterval) {
        this.time = now;
        this.age += delta;

        // update
        this.renderer.clearUI();
        this.scene.update(delta);
        this.renderer.render(delta);
      }
    }
  }
}

export default Master;
