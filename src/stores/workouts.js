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

  const exportData = () => {
    return { version, data: serialize(custom.value) };
  };

  const persist = async () => {
    await set(id, exportData());
  };

  const { ignoreUpdates } = watchIgnorable(custom, persist);

  const importData = (data) => {
    if (data != null && data.version != null) {
      custom.value = deserialize(Workout, data.data);
    }
  };

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => importData(data));
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

  const add = (workout) => {
    custom.value.push(workout);
    custom.value.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    triggerRef(custom);
    return custom.value.findIndex((value) => value === workout);
  };

  const remove = (index) => {
    custom.value.splice(index, 1);
    triggerRef(custom);
  };

  return { standard, custom, workouts, hydrate, add, remove, importData, exportData };
});
