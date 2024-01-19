import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Athlete } from '../modules/athlete';
import { deserialize, serialize } from '../utils/persist';

const id = 'athlete';
const version = 2;

export const useAthleteStore = defineStore(id, () => {
  const athlete = ref(new Athlete());

  const exportData = () => {
    return { version, data: serialize(athlete.value) };
  };

  const persist = async () => {
    await set(id, exportData());
  };

  const { ignoreUpdates } = watchIgnorable(athlete, persist, { deep: true });

  const importData = (data) => {
    if (data != null && data.version != null) {
      athlete.value = deserialize(Athlete, convert(data));
    }
  };

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => importData(data));
  };

  return { athlete, hydrate, importData, exportData };
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
