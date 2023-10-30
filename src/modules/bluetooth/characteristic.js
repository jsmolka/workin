import { Queue } from '../../utils/queue';

export class Characteristic {
  constructor() {
    this.characteristic = null;
    this.queue = new Queue();
  }

  async init(service, name) {
    this.characteristic = await service.getCharacteristic(name);
  }

  async read() {
    return await this.queue.enqueue(async () => await this.characteristic.readValue());
  }

  async write(...bytes) {
    return await this.queue.enqueue(
      async () => await this.characteristic.writeValueWithoutResponse(new Uint8Array(bytes)),
    );
  }

  async listen(callback) {
    this.characteristic.addEventListener('characteristicvaluechanged', (event) =>
      callback(event.target.value),
    );
    await this.characteristic.startNotifications();
  }
}
