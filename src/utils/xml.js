export function xml() {
  return new Proxy(
    {
      depth: 0,
      content: '<?xml version="1.0" encoding="UTF-8"?>\n',
      get indent() {
        return '  '.repeat(this.depth);
      },
    },
    {
      get(target, prop) {
        switch (prop) {
          case 'toString':
          case 'toPrimitive':
          case Symbol.toString:
          case Symbol.toPrimitive:
            return () => target.content;
        }

        return (...args) => {
          const value = args.pop();
          const attrs = args.map(([key, value]) => ` ${key}="${value}"`).join('');

          target.content += `${target.indent}<${prop}${attrs}>\n`;
          target.depth++;
          value();
          target.depth--;
          target.content += `${target.indent}</${prop}>\n`;
        };
      },

      set(target, prop, value) {
        target.content += `${target.indent}<${prop}>${value}</${prop}>\n`;
        return true;
      },
    },
  );
}
