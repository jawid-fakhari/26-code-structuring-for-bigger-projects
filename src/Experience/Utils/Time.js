import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    //Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; //why 16? default screens run at 16fps

    // this.tick(); //Non chiamo direttamente ma invece ↙️, cosi aspettiamo 1 frame
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick"); //call trigger method from extends, then listen it in experience

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
