import { Device } from './device';

export class SmartTrainer extends Device {
  constructor() {
    super();
  }

  async connected() {}

  async disconnected() {}

  get service() {
    return 'fitness_machine';
  }
}
