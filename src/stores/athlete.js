import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Athlete } from '../modules/athlete';
import { deserialize, serialize } from '../utils/persist';

const id = 'athlete';
const version = 1;

export const useAthleteStore = defineStore(id, () => {
  const athlete = ref(new Athlete());

  const persist = async () => {
    await set(id, { version, data: serialize(athlete.value) });
  };

  const { ignoreUpdates } = watchIgnorable(athlete, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      ignoreUpdates(() => {
        athlete.value = deserialize(Athlete, data.data);
      });
    }
  };

  return { athlete, hydrate };
});
