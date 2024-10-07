import * as THREE from "three";
import Experience from "../Experience";

export default class Fox {
  constructor() {
    //import experience scene and resources
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time; //⬇️
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");
    }

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
    //creare un oggetto per animation
    this.animation = {};
    //Animation mixer è il player di animation su un'ogg. specifico
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    //creare l'oggetto actions all'interno di ogg. animation
    this.animation.actions = {};

    //caricare tre key = value per ogni animation al'interno di actions
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    //aggiungere current action, che viene fatto play, in questo modo abbiamo tutto pronto
    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    //dentro animation obj, creiamo play mehod
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      //reset newAction > play newAction > apply crossFadeFrom
      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      //change current action with new action
      this.animation.actions.current = newAction;
    };

    //Debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }

  update() {
    //per animare usiamo update e passiamo il delta time che lo portiamo dal time class ⬆️
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
