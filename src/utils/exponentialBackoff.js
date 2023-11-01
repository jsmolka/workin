export async function exponentialBackoff(retries, delay, fn) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        resolve(await fn());
      } catch {
        if (retries > 0) {
          exponentialBackoff(retries - 1, delay * 2, fn).catch(reject);
        } else {
          reject();
        }
      }
    }, delay);
  });
}
