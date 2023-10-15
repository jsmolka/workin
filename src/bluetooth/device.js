export default class Device {
  constructor() {
    this.device = null;
    this.server = null;
  }

  async connect(options) {
    this.device = await navigator.bluetooth.requestDevice(options);
    this.server = await this.device.gatt.connect();

    this.device.addEventListener('gattserverdisconnected', () => {
      this.disconnected();
      this.server = null;
    });
  }

  disconnected() {
    // Abstract
  }

  get id() {
    return this.device?.id;
  }

  get name() {
    return this.device?.name;
  }
}
