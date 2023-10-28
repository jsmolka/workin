export function interval(duration, callback) {
  let time = null;
  let timeout = null;

  const tick = () => {
    callback();

    time ??= performance.now();
    time += duration;
    timeout = setTimeout(tick, Math.max(0, time - performance.now()));
  };

  timeout = setTimeout(tick, duration);

  return () => clearTimeout(timeout);
}
