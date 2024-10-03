import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class Experience {
  constructor(canvas) {
    //Global access (non indicato)
    window.experience = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();

    //Sizes
    //Ascolta la chiamata resize derivata dal Sizes Class
    this.sizes.on("resize", () => {
      //chiama la funzione resize
      this.resize();
    });

    //Time
    //Time tick event
    this.time.on("trigger", () => {
      this.update(); //⬇️
    });
  }

  resize() {}

  update() {}
}
