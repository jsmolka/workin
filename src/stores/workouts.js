import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { Workout } from '../modules/workout';
import { deserialize, serialize } from '../utils/persist';
import { workouts as predefined } from './data/workouts';

const id = 'workouts';

export const useWorkoutsStore = defineStore(id, () => {
  const custom = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      custom.value = deserialize(Workout, data);
    }
  };

  const persist = async () => {
    await set(id, serialize(custom.value));
  };

  watch(custom, persist, { deep: true });

  const workouts = computed(() => {
    return [...predefined, ...custom.value];
  });

  return { workouts, hydrate };
});
