import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';
import { Settings } from '../modules/settings';
import { log } from '../utils/log';
import { deserialize, serialize } from '../utils/persist';

const id = 'settings';
const version = 1;

export const useSettingsStore = defineStore(id, () => {
  const settings = ref(new Settings());

  const exportData = () => {
    return { version, data: serialize(settings.value) };
  };

  const persist = async () => {
    await set(id, exportData());
  };

  const { ignoreUpdates } = watchIgnorable(settings, persist, { deep: true });

  const importData = (data) => {
    if (data != null && data.version != null) {
      settings.value = deserialize(Settings, data.data);
    }
  };

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => importData(data));
  };

  watchEffect(() => {
    log.level = settings.value.logLevel;
  });

  return { settings, hydrate, importData, exportData };
});
