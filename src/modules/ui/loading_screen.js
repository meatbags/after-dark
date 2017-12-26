class LoadingScreen {
  constructor () {
    // dom
    this.element = document.createElement('div');
    this.element.classList.add('loading-screen', 'active');
    document.body.appendChild(this.element);

    // state
    this.active = true;
  }

  activate() {
    // activate

    if (!this.active) {
      this.active = true;
      this.element.style.opacity = '1';
    }
  }

  deactivate() {
    if (this.active) {
      this.active = false;
      this.element.style.opacity = '0';
      this.element.classList.remove('active');
    }
  }
}

export default LoadingScreen;
