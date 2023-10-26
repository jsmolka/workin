import { Device } from './device';

export class SmartTrainer extends Device {
  constructor() {
    super();
  }

  async connected() {
    await super.connected();

    console.log(this.device, this.server);
  }

  async disconnected() {
    await super.disconnected();
  }

  get service() {
    return 'fitness_machine';
  }
}
