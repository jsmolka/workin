export class DataStream {
  constructor(dataView) {
    this.dataView = dataView;
    this.index = 0;
  }

  unsigned(bytes) {
    let value = 0;
    for (let index = 0; index < bytes; index++) {
      value |= this.dataView.getUint8(this.index++) << (8 * index);
    }
    return value;
  }

  u8() {
    return this.unsigned(1);
  }

  u16() {
    return this.unsigned(2);
  }

  u24() {
    return this.unsigned(3);
  }

  u32() {
    return this.unsigned(4);
  }

  get length() {
    return this.dataView.byteLength;
  }
}
