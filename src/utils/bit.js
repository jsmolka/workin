export function bytes(value, size) {
  const bytes = [];
  while (size--) {
    bytes.push(value & 0xff);
    value >>>= 8;
  }
  return bytes;
}

export function signExtend(value, size) {
  const sign = 8 * (4 - size);
  return (value << sign) >> sign;
}

export const bit = {
  bytes,
  signExtend,
};
