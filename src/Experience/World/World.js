import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //Test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);

    //Recuperare resources e ascoltare ready event poi inistantiating Enviroment
    this.resources.on("ready", () => {
      //Setup
      const floor = new Floor(); // floor deve essere pirma di environment altrimenti non prender la luce del dichiarato per il sole
      this.environment = new Environment();
    });
  }
}
