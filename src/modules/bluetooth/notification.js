import { DataStream } from './dataStream';

export class Notification {
  constructor(dataView) {
    this.parse(new DataStream(dataView));
  }

  /**
   * @abstract
   */
  parse(stream) {
    void stream;
  }
}
