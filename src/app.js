/**
 ** @author meatbags / https://github.com/meatbags
 **/

import Master from './modules/master';

const App = {
  init: () => {
    const master = new Master();
    master.loop();
  }
}

window.onload = () => { App.init(); };
