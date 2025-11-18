import packageJson from '@/../package.json';
import { get as _get, set as _set, createStore } from 'idb-keyval';

const store = createStore(packageJson.name, 'store');

export async function get(key) {
  return _get(key, store);
}

export async function set(key, value) {
  return _set(key, value, store);
}
