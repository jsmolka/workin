import { createSchema, primitive } from '../utils/persist';

export class Athlete {
  constructor() {
    this.weight = 75;
    this.ftp = 300;
  }
}

createSchema(Athlete, {
  weight: primitive(),
  ftp: primitive(),
});
