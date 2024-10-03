import Experience from "../Experience.js";
import * as THREE from "three";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    //Test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
      })
    );
    this.scene.add(testMesh);
    console.log(this.scene);
  }
}
