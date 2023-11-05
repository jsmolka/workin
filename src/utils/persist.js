const schemas = new WeakMap();

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

export function list(definition) {
  return {
    serialize: (value) => value.map(definition.serialize),
    deserialize: (value) => value.map(definition.deserialize),
  };
}

export function nullable(definition) {
  return {
    serialize: (value) => (value != null ? definition.serialize(value) : null),
    deserialize: (value) => (value != null ? definition.deserialize(value) : null),
  };
}

function* prototypes(object) {
  let prototype = Object.getPrototypeOf(object);
  for (; prototype; prototype = Object.getPrototypeOf(prototype)) {
    yield prototype;
  }
}

export function serialize(object) {
  if (object instanceof Array) {
    return object.map((item) => serialize(item));
  }

  const data = {};
  for (const prototype of prototypes(object)) {
    const schema = schemas.get(prototype);
    if (schema == null) {
      continue;
    }
    for (const [key, { serialize }] of Object.entries(schema)) {
      const value = object[key];
      if (value === undefined) {
        throw `key does not exist: ${key}`;
      }
      data[key] = serialize(value);
    }
  }
  return data;
}

export function deserialize(class_, data) {
  if (data instanceof Array) {
    return data.map((item) => deserialize(class_, item));
  }

  const object = new class_();
  for (const prototype of prototypes(object)) {
    const schema = schemas.get(prototype);
    if (schema == null) {
      continue;
    }
    for (const [key, { deserialize }] of Object.entries(schema)) {
      const value = data[key];
      if (value === undefined) {
        continue;
      }
      object[key] = deserialize(value);
    }
  }
  return object;
}

export const persist = {
  createSchema,
  primitive,
  date,
  schema,
  list,
  nullable,
  serialize,
  deserialize,
};
