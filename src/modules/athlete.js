import { createSchema, primitive } from '@/utils/persist';

export class Athlete {
  constructor() {
    this.ftp = 200;
  }
}

createSchema(Athlete, {
  ftp: primitive(),
});
