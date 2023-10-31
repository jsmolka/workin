export function deleteNullKeys(object) {
  for (const [key, value] of object) {
    if (value == null) {
      delete object[key];
    }
  }
  return object;
}

export const object = {
  deleteNullKeys,
};
