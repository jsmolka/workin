import { defineSchema, primitive } from '@/utils/persist';

export class Settings {
  constructor() {
    this.logLevel = 'silent';
    this.logAsNotification = false;
  }
}

defineSchema(Settings, {
  logLevel: primitive(),
  logAsNotification: primitive(),
});
