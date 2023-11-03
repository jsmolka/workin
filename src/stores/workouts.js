import { get } from 'idb-keyval';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { workouts as workoutsData } from '../data/workouts';
import { Workout } from '../modules/workout';

const id = 'workouts';

export const useWorkoutsStore = defineStore(id, () => {
  const workoutsCustom = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      workoutsCustom.value = data.map((item) => deserialize(Workout, item));
    }
  };

  const workouts = computed(() => {
    return [...workoutsData, ...workoutsCustom.value];
  });

  return { workouts, hydrate };
});
