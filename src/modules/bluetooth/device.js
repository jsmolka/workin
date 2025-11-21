import { Emitter } from '@/utils/emitter';
import { eventListener } from '@/utils/eventListener';
import { log } from '@/utils/log';

export class Device extends Emitter {
  constructor(uuid) {
    super();

    this.uuid = uuid;
    this.device = null;
  }

  async request() {
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [this.uuid] }],
    });

    this.device.removeDisconnectedListener = eventListener(
      this.device,
      'gattserverdisconnected',
      async () => {
        try {
          log.warn(`Reconnecting to ${this.name}.`);
          await this.connect();
        } catch {
          this.emit('disconnected');
        }
      },
    );
  }

  async connect() {
    await this.device.gatt.connect();
  }

  disconnect() {
    this.device?.removeDisconnectedListener();
    this.device?.gatt.disconnect();
  }

  async service() {
    return await this.device.gatt.getPrimaryService(this.uuid);
  }

  get name() {
    return this.device.name;
  }
}
