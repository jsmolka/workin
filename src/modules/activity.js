import { createSchema, date, list, schema } from '../utils/persist';
import { Measurement } from './measurement';

export class Activity {
  constructor() {
    this.date = new Date();
    this.data = [];
  }
}

createSchema(Activity, {
  date: date(),
  data: list(schema(Measurement)),
});
