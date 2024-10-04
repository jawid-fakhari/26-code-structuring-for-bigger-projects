import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources;

    //Setup
    this.items = {}; //contiene loaded resources, viene popolato quando sources vengono loaded
    this.toLoad = this.sources.length; // contiene il numero delle sources to load
    this.loaded = 0; // contiene numero delle sources gia loaded

    //Avviare setLoaders per creare i loaders necessari
    this.setLoaders();
    this.startLoading();
  }
  //creare i loaders GLTFLoader, TextureLoader, CubeTextureLoader
  //se vuoi DracoLoader puoi aggiungere qui
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
  startLoading() {
    //Loop through the this.sources array and load them by using corresponded loader
    for (const source of this.sources) {
      // switch (source.type) {
      //   case "gltfModel":
      //     this.loaders.gltfLoader.load(source.path, (file) => {
      //       this.sourceLoaded(source, file);
      //     });
      //     break;
      //   case "texture":
      //     this.loaders.gltfLoader.load(source.path, (file) => {
      //       this.sourceLoaded(source, file);
      //     });
      //     break;
      //   case "cubeTexture":
      //     this.loaders.gltfLoader.load(source.path, (file) => {
      //       this.sourceLoaded(source, file);
      //     });
      //     break;
      // }
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }
  //popola this.items con e aggiunge 1 al loaded
  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;
    //quando loaded arriva alla largheza del toLoad chiama trigger ready
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
