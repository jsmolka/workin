export class Queue {
  constructor() {
    this.queue = [];
  }

  async enqueue(fn) {
    return new Promise(async (resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await fn());
        } catch (error) {
          reject(error);
        }
      });

      if (this.queue.length !== 1) {
        return;
      }

      while (this.queue.length > 0) {
        const fn = this.queue[0];
        try {
          await fn();
        } finally {
          this.queue.shift();
        }
      }
    });
  }
}
