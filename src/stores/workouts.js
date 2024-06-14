import { Workout } from '@/modules/workout';
import { workouts as standardWorkouts } from '@/stores/data/workouts';
import { deserialize, serialize } from '@/utils/persist';
import { makeNaturalComparer } from '@/utils/sorting';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';

const id = 'workouts';
const version = 1;

export const useWorkoutsStore = defineStore(id, () => {
  const standard = shallowRef(standardWorkouts);
  const custom = shallowRef([]);

  const toJson = () => {
    return { version, data: custom.value.map((workout) => serialize(workout)) };
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      custom.value = convert(data).map((workout) => deserialize(Workout, workout));
    }
  };

  const persist = async () => {
    await set(id, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(custom, persist);

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => fromJson(data));
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
    custom.value.sort(makeNaturalComparer('name'));
    triggerRef(custom);
    return custom.value.indexOf(workout);
  };

  const remove = (index) => {
    custom.value.splice(index, 1);
    triggerRef(custom);
  };

  return { standard, custom, toJson, fromJson, hydrate, workouts, add, remove };
});

function convert(data) {
  const { version, data: workouts } = data;
  switch (version) {
  }
  return workouts;
}
