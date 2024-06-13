import { createSchema, primitive } from '@/utils/persist';

export class Athlete {
  constructor() {
    this.ftp = 300;
  }
}

createSchema(Athlete, {
  ftp: primitive(),
});
