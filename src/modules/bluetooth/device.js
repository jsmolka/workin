import { notify } from '../../utils/notify';

export class Device {
  constructor() {
    this.device = null;
    this.reconnecting = false;
  }

  async connect() {
    this.device = null;
    this.reconnecting = false;

    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [this.service] }],
    });

    this.device.addEventListener('gattserverdisconnected', async () => {
      notify(`${this.device.name} disconnected`);

      this.disconnected();
      this.reconnecting = true;

      while (this.reconnecting) {
        try {
          const server = await this.device.gatt.connect();

          notify(`${this.device.name} reconnected`);

          this.reconnecting = false;
          this.connected(server);
        } catch {}
      }
    });

    this.connected(await this.device.gatt.connect());
  }

  /**
   * @abstract
   */
  connected() {}

  /**
   * @abstract
   */
  disconnected() {}

  /**
   * @abstract
   */
  get service() {}
}
