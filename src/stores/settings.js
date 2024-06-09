import { Settings } from '@/modules/settings';
import { log } from '@/utils/log';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

const id = 'settings';
const version = 1;

export const useSettingsStore = defineStore(id, () => {
  const settings = ref(new Settings());

  const toJson = () => {
    return { version, data: serialize(settings.value) };
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      settings.value = deserialize(Settings, data.data);
    }
  };

  const persist = async () => {
    await set(id, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(settings, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => fromJson(data));
  };

  watchEffect(() => {
    log.level = settings.value.logLevel;
  });

  return { settings, toJson, fromJson, hydrate };
});
