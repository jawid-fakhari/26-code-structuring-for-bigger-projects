import Experience from "../Experience";

export default class Floor {
  constructor() {
    //import experience scene and resources
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //creare le basi del nostro floor
    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.seMesh();
  }

  setGeometry() {}
  setTexture() {}
  setMaterial() {}
  seMesh() {}
}
