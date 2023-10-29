export function stringify(value) {
  if (value instanceof Array) {
    value = value.map(stringify).join(', ');
    return `[${value}]`;
  }

  if (value != null) {
    switch (typeof value) {
      case 'function':
        return `<function ${value.name}>`;

      case 'object':
        value = [...Object.entries(value)];
        value = value.map(([key, value]) => `${key}: ${stringify(value)}`);
        value = value.join(', ');
        return `{${value}}`;

      case 'symbol':
        return `<symbol ${value.description}>`;
    }
  }
  return String(value);
}
