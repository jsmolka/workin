import { Athlete } from '@/modules/athlete';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAthleteStore = defineStore('athlete', () => {
  const athlete = ref(new Athlete());

  const toJson = () => {
    return { version: 2, data: serialize(athlete.value) };
  };

  const migrate = (data) => {
    const { version, data: athlete } = data;
    switch (version) {
      case 1:
        delete athlete.weight;
        break;
    }
    return athlete;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      athlete.value = deserialize(Athlete, migrate(data));
    }
  };

  const storeKey = 'athlete';

  const persist = async () => {
    await set(storeKey, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(athlete, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storeKey);
    ignoreUpdates(() => fromJson(data));
  };

  return { athlete, toJson, fromJson, hydrate };
});
