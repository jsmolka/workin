import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Athlete } from '../modules/athlete';
import { deserialize, serialize } from '../utils/persist';

const id = 'athlete';

export const useAthleteStore = defineStore(id, () => {
  const athlete = ref(new Athlete());

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      athlete.value = deserialize(Athlete, data);
    }
  };

  watch(athlete, async () => await set(id, serialize(athlete.value)), { deep: true });

  return { athlete, hydrate };
});
