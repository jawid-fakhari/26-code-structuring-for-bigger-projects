import * as THREE from "three";
import Camera from "./Utils/Camera";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Renderer from "./Utils/Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Debug from "./Utils/Debug.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    //cosi solo una volta viene istanziato
    if (instance) {
      return instance;
    }

    instance = this;

    //Global access (non indicato)
    window.experience = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    //init resources, passare sources dentro
    this.resources = new Resources(sources);
    //Ci sono 3 metodi per chiamare la camera:
    //1-globale usande window.experience in classe Camera.js ((non pulito))
    //2-passare il parametro globale al constructor di camera: new Camera(this) ((troppi passaggi))
    //3-Singleton class ((cleanest way)) che usiamo qui, instance ⬆️
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    //Sizes
    //Ascolta la chiamata resize derivata dal Sizes Class
    this.sizes.on("resize", () => {
      //chiama la funzione resize
      this.resize(); //(⬇️)=>{}
    });

    //Time
    //Time tick event
    this.time.on("tick", () => {
      this.update(); //(⬇️)=>{}
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  //destroy method deve essere fatto per ogni classe, qui abbiamo fatto cosi. ma in realta si fa per ogni classe
  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();
  }
}
