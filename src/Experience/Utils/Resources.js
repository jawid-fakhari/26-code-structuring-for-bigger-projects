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
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          console.log(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          console.log(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          console.log(source, file);
        });
      }
    }
  }
}
