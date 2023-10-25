import { Device } from './device';

export class SmartTrainer extends Device {
  async connected(server) {
    console.log(this.device, server);
  }

  get service() {
    return 'fitness_machine';
  }
}
