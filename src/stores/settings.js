import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { Settings } from '../modules/settings';
import { deserialize, serialize } from '../utils/persist';

const id = 'settings';

export const useSettingsStore = defineStore(id, {
  state: () => ({
    settings: new Settings(),
  }),

  actions: {
    async hydrate() {
      const data = await get(id);
      if (data !== undefined) {
        this.settings = deserialize(Settings, data);
      }
    },

    async persist() {
      await set(id, serialize(this.settings));
    },
  },
});
