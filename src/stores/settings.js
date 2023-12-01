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

  const persist = async () => {
    await set(id, { version, data: serialize(settings.value) });
  };

  const { ignoreUpdates } = watchIgnorable(settings, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      ignoreUpdates(() => {
        settings.value = deserialize(Settings, data.data);
      });
    }
  };

  watchEffect(() => {
    log.level = settings.value.logLevel;
  });

  return { settings, hydrate };
});
