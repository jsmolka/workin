import { Athlete } from '@/modules/athlete';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const version = 2;

export const useAthleteStore = defineStore('athlete', () => {
  const athlete = ref(new Athlete());

  const toJson = () => {
    return { version, data: serialize(athlete.value) };
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      athlete.value = deserialize(Athlete, convert(data));
    }
  };

  const storageKey = 'athlete';

  const persist = async () => {
    await set(storageKey, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(athlete, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storageKey);
    ignoreUpdates(() => fromJson(data));
  };

  return { athlete, toJson, fromJson, hydrate };
});

function convert(data) {
  const { version, data: athlete } = data;
  switch (version) {
    case 1:
      delete athlete.weight;
      break;
  }
  return athlete;
}
