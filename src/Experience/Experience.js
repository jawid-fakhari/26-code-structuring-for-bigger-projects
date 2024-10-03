import Sizes from "./Utils/Sizes";

export default class Experience {
  constructor(canvas) {
    //Global access (non indicato)
    window.experience = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.sizes = new Sizes();

    //Ascolta la chiamata resize derivata dal Sizes Class
    this.sizes.on("resize", () => {
      //chiama la funzione resize
      this.resize();
    });
  }

  resize() {}
}
