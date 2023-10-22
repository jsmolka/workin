import mitt from "mitt";

export class Emitter {
  constructor() {
    Object.assign(this, mitt());
  }
}
