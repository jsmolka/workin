import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch, watchEffect } from 'vue';
import { Settings } from '../modules/settings';
import { log } from '../utils/log';
import { deserialize, serialize } from '../utils/persist';

const id = 'settings';
const version = 1;

export const useSettingsStore = defineStore(id, () => {
  const settings = ref(new Settings());

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version === version) {
      settings.value = deserialize(Settings, data.data);
    }
  };

  const persist = async () => {
    await set(id, { version, data: serialize(settings.value) });
  };

  watch(settings, persist, { deep: true });

  watchEffect(() => {
    log.level = settings.value.logLevel;
  });

  return { settings, hydrate };
});
