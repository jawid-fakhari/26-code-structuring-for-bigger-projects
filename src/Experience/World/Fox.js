import Experience from "../Experience";

export default class Fox {
  constructor() {
    //import experience scene and resources
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //Setup
    this.resource = this.resources.items.foxModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);
  }
}
