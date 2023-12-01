import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';
import { Workout } from '../modules/workout';
import { deserialize, serialize } from '../utils/persist';
import { workouts as standardWorkouts } from './data/workouts';

const id = 'workouts';
const version = 1;

export const useWorkoutsStore = defineStore(id, () => {
  const standard = shallowRef(standardWorkouts);
  const custom = shallowRef([]);

  const persist = async () => {
    await set(id, { version, data: serialize(custom.value) });
  };

  const { ignoreUpdates } = watchIgnorable(custom, persist);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      ignoreUpdates(() => {
        custom.value = deserialize(Workout, data.data);
      });
    }
  };

  const workouts = (type) => {
    switch (type) {
      case 'standard':
        return standard.value;
      case 'custom':
        return custom.value;
    }
    return [];
  };

  const push = (workout) => {
    custom.value.push(workout);
    custom.value.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    triggerRef(custom);
    return custom.value.findIndex((value) => value === workout);
  };

  return { standard, custom, workouts, hydrate, push };
});
