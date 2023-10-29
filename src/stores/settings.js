import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Settings } from '../modules/settings';
import { deserialize, serialize } from '../utils/persist';

const id = 'settings';

export const useSettingsStore = defineStore(id, () => {
  const settings = ref(new Settings());

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      settings.value = deserialize(Settings, data);
    }
  };

  watch(settings, () => set(id, serialize(settings.value)), { deep: true });

  return { settings, hydrate };
});
