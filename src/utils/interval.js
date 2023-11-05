export function interval(ms, callback) {
  let time = null;
  let timeout = null;

  const tick = () => {
    callback();

    time ??= performance.now();
    time += ms;
    timeout = setTimeout(tick, Math.max(0, time - performance.now()));
  };

  timeout = setTimeout(tick, ms);

  return () => clearTimeout(timeout);
}
