export function deleteNullValues(object) {
  for (const [key, value] of Object.entries(object)) {
    if (value == null) {
      delete object[key];
    }
  }
  return object;
}

export const object = {
  deleteNullValues,
};
