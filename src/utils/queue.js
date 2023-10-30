export class Queue {
  constructor() {
    this.queue = [];
  }

  async enqueue(action) {
    return new Promise(async (resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await action());
        } catch (error) {
          reject(error);
        }
      });

      if (this.queue.length !== 1) {
        return;
      }

      while (this.queue.length > 0) {
        const action = this.queue[0];
        try {
          await action();
        } finally {
          this.queue.shift();
        }
      }
    });
  }
}
