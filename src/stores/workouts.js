import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Workout } from '../modules/workout';
import { deserialize, serialize } from '../utils/persist';
import { workouts as standardWorkouts } from './data/workouts';

const id = 'workouts';
const version = 1;

export const useWorkoutsStore = defineStore(id, () => {
  const standard = ref(standardWorkouts);
  const custom = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      custom.value = deserialize(Workout, data.data);
    }
  };

  const persist = async () => {
    await set(id, { version, data: serialize(custom.value) });
  };

  watch(custom, persist, { deep: true });

  const workouts = (type) => {
    switch (type) {
      case 'standard':
        return standard.value;
      case 'custom':
        return custom.value;
    }
    return [];
  };

  return { standard, custom, workouts, hydrate };
});
