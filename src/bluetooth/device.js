import notyf from '../utils/notyf';

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
    });
  }

  disconnected() {
    notyf.error(`${this.name} disconnected`);
    this.server = null;
  }

  get id() {
    return this.device?.id;
  }

  get name() {
    return this.device?.name;
  }
}