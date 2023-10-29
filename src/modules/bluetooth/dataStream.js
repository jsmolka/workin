export class DataStream {
  constructor(dataView) {
    this.dataView = dataView;
    this.index = 0;
  }

  uint(size) {
    let uint = 0;
    for (let i = 0; i < size; i++) {
      uint |= this.dataView.getUint8(this.index++) << (8 * i);
    }
    return uint;
  }

  u8() {
    return this.uint(1);
  }

  u16() {
    return this.uint(2);
  }

  u24() {
    return this.uint(3);
  }

  u32() {
    return this.uint(4);
  }

  get length() {
    return this.dataView.byteLength;
  }
}
