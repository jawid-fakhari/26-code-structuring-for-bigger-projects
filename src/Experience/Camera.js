import { OrbitControls } from "three/examples/jsm/Addons.js";
import Experience from "./Experience";
import * as THREE from "three";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    //creare un instance chiamando la func ⬇️
    this.setInstance();
    this.setOrbitControls();
    this.resize();
  }

  //Creare un prespectiveCamera e salvarlo come un istance property
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
  //Crare orbitControls
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }
  //
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
  }
}
