import { enumerate } from '@/utils/iterator.js';

const schemas = new Map();

export function defineSchema(class_, schema) {
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

export function dynamic(getClass) {
  return {
    serialize: (value) => serialize(value),
    deserialize: (value) => {
      const class_ = getClass(value);
      if (class_ == null) {
        throw new Error('No class');
      }
      return deserialize(class_, value);
    },
  };
}

export function array(persist, class_ = Array) {
  return {
    serialize: (value) => Array.from(value, persist.serialize),
    deserialize: (value) => class_.from(value, persist.deserialize),
  };
}

export function nullable(persist) {
  return {
    serialize: (value) => (value != null ? persist.serialize(value) : null),
    deserialize: (value) => (value != null ? persist.deserialize(value) : null),
  };
}

export function alias(name, persist) {
  return { name, ...persist };
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
        throw new Error(`No schema for ${prototype.constructor.name}`);
      }
      continue;
    }
    for (const [key, { name = key, serialize }] of Object.entries(schema)) {
      const value = object[key];
      if (value === undefined) {
        console.warn(`No value for ${prototype.constructor.name}.${key}`);
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
        throw new Error(`No schema for ${prototype.constructor.name}`);
      }
      continue;
    }
    for (const [key, { name = key, deserialize }] of Object.entries(schema)) {
      const value = data[name];
      if (value === undefined) {
        console.warn(`No value for ${prototype.constructor.name}.${key}`);
        continue;
      }
      target[key] = deserialize(value);
    }
  }
  return target;
}

export function clone(object) {
  return deserialize(object.constructor, serialize(object));
}

export function assign(target, source) {
  return deserialize(source.constructor, serialize(source), target);
}
