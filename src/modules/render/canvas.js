class Canvas {
  constructor(id, width, height, DOMTarget) {
    // create canvas element and append to DOM

    // canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = id;
    this.resize(width, height);
    this.context = this.canvas.getContext('2d');

    // DOM
    this.DOMTarget = DOMTarget;
    this.DOMTarget.appendChild(this.canvas);

    // default style
    this.context.fillStyle = this.context.strokeStyle = '#fff';
  }

  clear() {
    // clear canvas

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setIndex(index) {
    // set css z index

    this.canvas.style.zIndex = index;
  }

  setFont(font) {
    // set font

    this.context.font = font;
  }

  resize(width, height) {
    // set width & height

    this.canvas.width = width;
    this.canvas.height = height;
  }
}

export default Canvas;
