export class Xml {
  constructor() {
    this.depth = 0;
    this.content = '<?xml version="1.0" encoding="UTF-8"?>\n';
  }

  element(name, ...args) {
    const value = args.pop();
    const attributes = args.length > 0 ? ` ${args.join(' ')}` : '';
    this.content += '  '.repeat(this.depth);
    this.content += `<${name}${attributes}>`;
    if (value instanceof Function) {
      this.content += '\n';
      this.depth++;
      value();
      this.depth--;
      this.content += '  '.repeat(this.depth);
    } else {
      this.content += value;
    }
    this.content += `</${name}>\n`;
  }

  toString() {
    return this.content;
  }
}
