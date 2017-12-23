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

  setStyle(style) {
    // set css

    for (let prop in style) {
      if (style.hasOwnProperty(prop)) {
        this.canvas.style[prop] = style[prop];
      }
    }
  }

  setContext(props) {
    // set canvas props

    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        this.context[prop] = props[prop];
      }
    }
  }

  resize(width, height) {
    // set width & height

    this.canvas.width = width;
    this.canvas.height = height;
  }
}

export default Canvas;
