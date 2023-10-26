import { notify } from '../../utils/notify';

export class Device {
  constructor() {
    this.device = null;
    this.server = null;
  }

  async connect() {
    if (this.device) {
      await this.disconnect();
    }

    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [this.service] }],
    });

    this.device.addEventListener('gattserverdisconnected', async () => {
      if (this.device == null) {
        return;
      }

      this.server = null;

      notify(`${this.device.name} disconnected`);
      await this.disconnected();
      await this.reconnect();
    });

    this.server = await this.device.gatt.connect();
    await this.connected();
  }

  /**
   * @abstract
   */
  async connected() {}

  async disconnect() {
    const gatt = this.device.gatt;

    // Prevent reconnect
    this.device = null;
    this.server = null;

    if (gatt.connected) {
      gatt.disconnect();
    }

    await this.disconnected();
  }

  /**
   * @abstract
   */
  async disconnected() {}

  async reconnect() {
    const time = performance.now();
    while (performance.now() - time < 60_000) {
      const device = this.device;
      try {
        this.server = await device.gatt.connect();
        this.device = device;
      } catch (error) {
        if (error instanceof DOMException) {
          continue;
        }
      }

      notify(`${this.device.name} reconnected`);
      this.connected();
      return;
    }
    this.device = null;
  }

  isConnected() {
    return this.device != null && this.server != null;
  }

  isConnecting() {
    return this.device != null && this.server == null;
  }

  isDisconnected() {
    return this.device == null && this.server == null;
  }

  /**
   * @abstract
   */
  get service() {}
}
