import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //Recuperare resources e ascoltare ready event poi inistantiating Enviroment
    this.resources.on("ready", () => {
      //Setup
      // floor & fox deve essere pirma di environment altrimenti non prender la luce del dichiarato per il sole
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
