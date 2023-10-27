export class DataStream {
  constructor(dataView) {
    this.dataView = dataView;
    this.index = 0;
  }

  u8() {
    const data = this.dataView.getUint8(this.index);
    this.index += 1;
    return data;
  }

  u16(littleEndian = true) {
    const data = this.dataView.getUint16(this.index, littleEndian);
    this.index += 2;
    return data;
  }

  u32(littleEndian = true) {
    const data = this.dataView.getUint32(this.index, littleEndian);
    this.index += 4;
    return data;
  }
}
