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
  }
  //creare i loaders GLTFLoader, TextureLoader, CubeTextureLoader
  //se vuoi DracoLoader puoi aggiungere qui
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
}
