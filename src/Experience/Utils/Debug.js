import GUI from "lil-gui";

//Debug class creato, i tweaks invece dentro i classi vanno creati
export default class Debug {
  constructor() {
    //quando sul link aggiungi #debug ci attiva il debug pannel
    this.active = window.location.hash === "#debug";
    if (this.active) {
      this.ui = new GUI();
    }
  }
}
