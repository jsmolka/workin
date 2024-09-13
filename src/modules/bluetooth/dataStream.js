import { signExtend } from '@/utils/bit';

export class DataStream {
  constructor(dataView) {
    this.dataView = dataView;
    this.index = 0;
  }

  unsigned(size) {
    let value = 0;
    for (let i = 0; i < size; i++) {
      value |= this.dataView.getUint8(this.index++) << (8 * i);
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

  signed(size) {
    return signExtend(this.unsigned(size), size);
  }

  s8() {
    return this.signed(1);
  }

  s16() {
    return this.signed(2);
  }

  s24() {
    return this.signed(3);
  }

  s32() {
    return this.signed(4);
  }

  get length() {
    return this.dataView.byteLength;
  }
}
