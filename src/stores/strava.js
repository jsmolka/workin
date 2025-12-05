import { Strava } from '@/modules/strava';
import { deserialize, serialize } from '@/utils/persist';
import { get, set } from '@/utils/store';
import { watchIgnorable } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStravaStore = defineStore('strava', () => {
  const strava = ref(new Strava());

  const toJson = () => {
    return { version: 1, data: serialize(strava.value) };
  };

  const migrate = (data) => {
    const { version, data: strava } = data;
    switch (version) {
      case 1:
    }
    return strava;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      strava.value = deserialize(Strava, migrate(data));
    }
  };

  const storeKey = 'strava';
  const storeVersion = 1;

  const persist = async () => {
    await set(storeKey, { storeVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(strava, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storeKey);
    if (data != null && data.storeVersion === storeVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
  };

  return { strava, toJson, fromJson, hydrate };
});
