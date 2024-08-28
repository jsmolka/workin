import { defineSchema, primitive } from '@/utils/persist';

export class Athlete {
  constructor() {
    this.ftp = 200;
  }
}

defineSchema(Athlete, {
  ftp: primitive(),
});
