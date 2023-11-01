import { Emitter } from '../../utils/emitter';
import { eventListener } from '../../utils/eventListener';

export class Device extends Emitter {
  constructor(uuid) {
    super();

    this.uuid = uuid;
    this.device = null;
  }

  async connect() {
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [this.uuid] }],
    });

    this.device.removeDisconnectedListener = eventListener(
      this.device,
      'gattserverdisconnected',
      async () => {
        try {
          await this.device.gatt.connect();
        } catch {
          this.emit('disconnected');
        }
      },
    );

    await this.device.gatt.connect();
  }

  async disconnect() {
    this.device?.removeDisconnectedListener?.();
    this.device?.gatt.disconnect();
  }

  async service() {
    return await this.device.gatt.getPrimaryService(this.uuid);
  }

  get name() {
    return this.device.name;
  }
}
