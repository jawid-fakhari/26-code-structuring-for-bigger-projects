import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
  constructor() {
    //quando un classe si estende l'altro con super chiamiamo il constructor del classe madre
    super();

    //Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    //Resize event
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      //il metodo trigger che deriva dal EventEmitter class, chiama resize e quindi viene ascoltato nel Experience class
      this.trigger("resize");
    });
  }
}
