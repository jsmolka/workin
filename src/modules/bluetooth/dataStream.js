export class DataStream {
  constructor(dataView) {
    this.dataView = dataView;
    this.index = 0;
  }

  u8() {
    return this.dataView.getUint8(this.index++);
  }

  u16() {
    return this.u8() | (this.u8() << 8);
  }

  u24() {
    return this.u8() | (this.u8() << 8) | (this.u8() << 16);
  }

  u32() {
    return this.u8() | (this.u8() << 8) | (this.u8() << 16) | (this.u8() << 24);
  }

  get length() {
    return this.dataView.byteLength;
  }
}
