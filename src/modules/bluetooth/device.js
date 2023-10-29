import { notify } from '../../utils/notify';

export class Device {
  constructor() {
    this.device = null;
    this.server = null;
  }

  async connect() {
    if (this.device != null) {
      await this.disconnect();
    }

    try {
      const options = {
        filters: [{ services: [this.service] }],
      };

      this.device = await navigator.bluetooth.requestDevice(options);
      this.server = await this.device.gatt.connect();
    } catch {
      this.device = null;
      this.server = null;
      return;
    }

    this.device.addEventListener('gattserverdisconnected', async () => {
      if (this.device == null) {
        return;
      }

      await this.disconnected();

      try {
        this.server = null;
        this.server = await this.device.gatt.connect();

        await this.connected();
      } catch {
        notify.info(`${this.name} disconnected`);

        this.device = null;
        this.server = null;
      }
    });

    await this.connected();
  }

  async disconnect() {
    this.device = null;
    this.server.disconnect();
    this.server = null;

    await this.disconnected();
  }

  get name() {
    return this.device.name;
  }

  get isConnected() {
    return this.device != null && this.server != null;
  }

  get isConnecting() {
    return this.device != null && this.server == null;
  }

  get isDisconnected() {
    return this.device == null;
  }

  /**
   * @abstract
   */
  get service() {}

  /**
   * @abstract
   */
  async connected() {}

  /**
   * @abstract
   */
  async disconnected() {}
}
