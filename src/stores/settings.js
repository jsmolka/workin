import { Settings } from '@/modules/settings';
import { log } from '@/utils/log';
import { deserialize, serialize } from '@/utils/persist';
import { get, set } from '@/utils/store';
import { watchIgnorable } from '@vueuse/core';
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
    }
    return settings;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      settings.value = deserialize(Settings, migrate(data));
    }
  };

  const storeKey = 'settings';
  const storeVersion = 1;

  const persist = async () => {
    await set(storeKey, { storeVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(settings, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storeKey);
    if (data != null && data.storeVersion === storeVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
  };

  watchEffect(() => {
    log.level = settings.value.logLevel;
  });

  return { settings, toJson, fromJson, hydrate };
});
