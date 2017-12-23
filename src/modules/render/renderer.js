import { Config } from '../config';
import Canvas from './canvas';

class Renderer {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    // set up
    this.config = Config.renderer;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.setClearColor(0x0, 1);

    // set up post processing
    this.pass = {
      render: new THREE.RenderPass(this.scene, this.camera),
      fxaa: new THREE.ShaderPass(THREE.FXAAShader),
      ssao: new THREE.SSAOPass(this.scene, this.camera),
      bloom: new THREE.UnrealBloomPass(new THREE.Vector2(this.config.width, this.config.height), this.config.bloom.strength, this.config.bloom.radius, this.config.bloom.threshold),
      noise: new THREE.NoisePass()
    };
    this.pass.noise.renderToScreen = true;
    this.composer = new THREE.EffectComposer(this.renderer);

    for (let prop in this.pass) {
      if (this.pass.hasOwnProperty(prop)) {
        this.composer.addPass(this.pass[prop]);
      }
    }

    // gamma
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    // add to document
    document.body.appendChild(this.renderer.domElement);

    // create UI canvas
    this.ui = new Canvas(Config.renderer.ui.elementID, this.config.width, this.config.height, document.body);
    this.ui.setIndex(Config.renderer.ui.zIndex);
    this.ui.setFont(Config.renderer.ui.font);
  }

  clearUI() {
    // clear UI canvas

    this.ui.clear();
  }

  render(delta) {
    this.composer.render(delta);
  }
}

export default Renderer;
