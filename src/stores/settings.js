import { Settings } from '@/modules/settings';
import { log } from '@/utils/log';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref(new Settings());

  const toJson = () => {
    return { version: 1, data: serialize(settings.value) };
  };

  const migrate = (data) => {
    const { version, data: settings } = data;
    switch (version) {
      case 1:
        break;
    }
    return settings;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      settings.value = deserialize(Settings, migrate(data));
    }
  };

  const storeKey = 'settings';

  const persist = async () => {
    await set(storeKey, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(settings, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storeKey);
    ignoreUpdates(() => fromJson(data));
  };

  watchEffect(() => {
    log.level = settings.value.logLevel;
  });

  return { settings, toJson, fromJson, hydrate };
});
