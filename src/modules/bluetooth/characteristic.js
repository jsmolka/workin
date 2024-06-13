import { Queue } from '@/utils/queue';

export class Characteristic {
  constructor(uuid) {
    this.uuid = uuid;
    this.characteristic = null;
    this.queue = new Queue();
  }

  async init(service) {
    this.characteristic = await service.getCharacteristic(this.uuid);
  }

  async read() {
    return await this.queue.enqueue(async () => await this.characteristic.readValue());
  }

  async write(...bytes) {
    return await this.queue.enqueue(
      async () => await this.characteristic.writeValueWithoutResponse(new Uint8Array(bytes)),
    );
  }

  async notified(callback) {
    this.characteristic.addEventListener('characteristicvaluechanged', (event) =>
      callback(event.target.value),
    );
    await this.characteristic.startNotifications();
  }
}
