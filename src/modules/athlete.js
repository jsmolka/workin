import { createSchema, primitive } from '../utils/persist';

export default class Athlete {
  constructor() {
    this.height = 175;
    this.weight = 75;
    this.ftp = 300;
  }
}

createSchema(Athlete, {
  height: primitive(),
  weight: primitive(),
  ftp: primitive(),
});
