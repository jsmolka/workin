export function eventListener(target, type, listener) {
  target.addEventListener(type, listener);
  return () => target.removeEventListener(type, listener);
}
