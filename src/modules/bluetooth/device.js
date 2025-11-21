import { Emitter } from '@/utils/emitter';
import { eventListener } from '@/utils/eventListener';
import { toast } from '@/utils/toast';

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
          toast(`${this.name} reconnecting.`, { type: 'warning' });
          await this.connect();
          toast(`${this.name} reconnected.`, { type: 'success' });
        } catch {
          toast(`${this.name} disconnected.`, { type: 'error' });
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
