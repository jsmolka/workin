import { DataStream } from '@/modules/bluetooth/dataStream';

export class Notification {
  constructor(dataView) {
    this.parse(new DataStream(dataView));
  }

  /**
   * @abstract
   */
  parse(stream) {}
}
