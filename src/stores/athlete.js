import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Athlete } from '../modules/athlete';
import { deserialize, serialize } from '../utils/persist';

const id = 'athlete';
const version = 1;

export const useAthleteStore = defineStore(id, () => {
  const athlete = ref(new Athlete());

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      athlete.value = deserialize(Athlete, data.data);
    }
  };

  const persist = async () => {
    await set(id, { version, data: serialize(athlete.value) });
  };

  watch(athlete, persist, { deep: true });

  return { athlete, hydrate };
});
