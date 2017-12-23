class Keyboard {
  constructor() {
    // handle keyboard input

    this.keys = {};
    document.addEventListener('keydown', (key) => { this.onKeyDown(key); });
    document.addEventListener('keyup', (key) => { this.onKeyUp(key); });
  }

  forceUp(key) {
    // set key to false
    
    this.keys[key] = false;
  }

  onKeyDown(key) {
    // record relevant key presses

    switch (key.key) {
      case 'w': case 'W':
        this.keys.w = true;
        break;
      case 's': case 'S':
        this.keys.s = true;
        break;
      case 'a': case 'A':
        this.keys.a = true;
        break;
      case 'd': case 'D':
        this.keys.d = true;
        break;
      case 'e': case 'E':
        this.keys.e = true;
        break;
      default:
        break;
    }
  }

  onKeyUp(key) {
    // record relevant key releases

    switch (key.key) {
      case 'w': case 'W':
        this.keys.w = false;
        break;
      case 's': case 'S':
        this.keys.s = false;
        break;
      case 'a': case 'A':
        this.keys.a = false;
        break;
      case 'd': case 'D':
        this.keys.d = false;
        break;
      case 'e': case 'E':
        this.keys.e = true;
        break;
      default:
        break;
    }
  }
}

export default Keyboard;
