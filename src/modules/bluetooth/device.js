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

      notify(`${this.device.name} disconnected`);

      this.device = null;
      this.server = null;

      await this.disconnected();
    });

    await this.connected();
  }

  async disconnect() {
    const gatt = this.device.gatt;

    this.device = null;
    this.server = null;

    gatt.disconnect();

    await this.disconnected();
  }

  get isConnected() {
    return this.device != null && this.server != null;
  }

  get isConnecting() {
    return this.device != null && this.server == null;
  }

  get isDisconnected() {
    return this.device == null && this.server == null;
  }

  /**
   * @abstract
   */
  get service() {}

  /**
   * @abstract
   */
  async disconnected() {}

  /**
   * @abstract
   */
  async connected() {}
}
