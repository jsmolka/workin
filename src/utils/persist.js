import { enumerate } from '@/utils/iterator.js';

const schemas = new Map();

export function createSchema(class_, schema) {
  schemas.set(class_.prototype, schema);
}

export function primitive() {
  return {
    serialize: (value) => value,
    deserialize: (value) => value,
  };
}

export function date() {
  return {
    serialize: (value) => value.getTime(),
    deserialize: (value) => new Date(value),
  };
}

export function schema(class_) {
  return {
    serialize: (value) => serialize(value),
    deserialize: (value) => deserialize(class_, value),
  };
}

export function array(definition, class_ = Array) {
  return {
    serialize: (value) => Array.from(value, definition.serialize),
    deserialize: (value) => class_.from(value, definition.deserialize),
  };
}

export function nullable(definition) {
  return {
    serialize: (value) => (value != null ? definition.serialize(value) : null),
    deserialize: (value) => (value != null ? definition.deserialize(value) : null),
  };
}

export function alias(name, definition) {
  return { name, ...definition };
}

function* prototypes(object) {
  let prototype = Object.getPrototypeOf(object);
  for (; prototype; prototype = Object.getPrototypeOf(prototype)) {
    yield prototype;
  }
}

export function serialize(object) {
  const data = {};
  for (const [i, prototype] of enumerate(prototypes(object))) {
    const schema = schemas.get(prototype);
    if (schema == null) {
      if (i === 0) {
        throw new Error('No schema');
      }
      continue;
    }
    for (const [key, { name = key, serialize }] of Object.entries(schema)) {
      const value = object[key];
      if (value === undefined) {
        console.warn('No value for key', key);
        continue;
      }
      data[name] = serialize(value);
    }
  }
  return data;
}

export function deserialize(class_, data, target = new class_()) {
  for (const [i, prototype] of enumerate(prototypes(target))) {
    const schema = schemas.get(prototype);
    if (schema == null) {
      if (i === 0) {
        throw new Error('No schema');
      }
      continue;
    }
    for (const [key, { name = key, deserialize }] of Object.entries(schema)) {
      const value = data[name];
      if (value === undefined) {
        console.warn('No value for key', name);
        continue;
      }
      target[key] = deserialize(value);
    }
  }
  return target;
}

export function clone(object, target = new object.constructor()) {
  return deserialize(object.constructor, serialize(object), target);
}
