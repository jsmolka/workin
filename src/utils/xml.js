class Stack extends Array {
  pop() {
    const item = this.at(-1);
    super.pop();
    return item;
  }
}

export class Xml {
  constructor(indent = '  ') {
    this.lines = ['<?xml version="1.0" encoding="utf-8"?>'];
    this.elements = new Stack();
    this.indent = indent;
  }

  static attribute(name, value) {
    return ` ${name}="${value}"`;
  }

  write(value) {
    this.lines.push(`${this.indent.repeat(this.elements.length)}${value}`);
  }

  node(name, attributes = []) {
    this.write(`<${name}${attributes.join('')}>`);
    this.elements.push(name);
  }

  end() {
    this.write(`</${this.elements.pop()}>`);
  }

  leaf(name, value, attributes = []) {
    this.write(`<${name}${attributes.join('')}>${value}</${name}>`);
  }

  toString() {
    return this.lines.join('\n');
  }
}
