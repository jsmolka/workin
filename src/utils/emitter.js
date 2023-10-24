import mitt from 'mitt';

export default class Emitter {
  constructor() {
    Object.assign(this, mitt());
  }
}
