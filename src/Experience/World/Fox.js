import * as THREE from "three";
import Experience from "../Experience";

export default class Fox {
  constructor() {
    //import experience scene and resources
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time; //⬇️

    //Setup
    this.resource = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    //traversa sul modello e tutti i suoi discendenti e se il child è un mesh castShadow
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
  setAnimation() {
    this.animation = {};
    //Animation mixer è il player di animation su un'ogg. specifico
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.animation.action = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.action.play();
  }
  update() {
    //per animare usiamo update e passiamo il delta time che lo portiamo dal time class ⬆️
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
