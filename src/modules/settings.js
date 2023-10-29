import { createSchema, primitive } from '../utils/persist';

export class Settings {
  constructor() {
    this.logLevel = 'silent';
    this.logAsNotification = false;
  }
}

createSchema(Settings, {
  logLevel: primitive(),
  logAsNotification: primitive(),
});
