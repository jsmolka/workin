import { enumerate } from '@/utils/iterator.js';
import { cloneDeep } from 'lodash-es';

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

export function object() {
  return {
    serialize: (value) => cloneDeep(value),
    deserialize: (value) => cloneDeep(value),
  };
}

export function date() {
  return {
    serialize: (value) => value.getTime(),
    deserialize: (value, target = null) => {
      target ??= new Date();
      target.setTime(value);
      return target;
    },
  };
}

export function schema(class_) {
  return {
    serialize: (value) => serialize(value),
    deserialize: (value, target = null) => deserialize(class_, value, target),
  };
}

export function dynamic(getClass) {
  return {
    serialize: (value) => serialize(value),
    deserialize: (value, target = null) => {
      const class_ = getClass(value);
      if (class_ == null) {
        throw new Error('No class');
      }
      return deserialize(class_, value, target);
    },
  };
}

export function array(persist, class_ = Array) {
  return {
    serialize: (value) => Array.from(value, (item) => persist.serialize(item)),
    deserialize: (value) => class_.from(value, (item) => persist.deserialize(item)),
  };
}

export function nullable(persist) {
  return {
    serialize: (value) => (value != null ? persist.serialize(value) : null),
    deserialize: (value, target = null) =>
      value != null ? persist.deserialize(value, target) : null,
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

export function deserialize(class_, data, target = null) {
  if (!(target instanceof class_)) {
    target = new class_();
  }

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
      target[key] = deserialize(value, target[key]);
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
