import { Workout } from '@/modules/workout';
import { workouts as standard } from '@/stores/data/workouts';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';

const version = 1;

export const useWorkoutsStore = defineStore('workouts', () => {
  const custom = shallowRef([]);

  const toJson = () => {
    return { version, data: custom.value.map((workout) => serialize(workout)) };
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      custom.value = convert(data).map((workout) => deserialize(Workout, workout));
    }
  };

  const storageKey = 'workouts';

  const persist = async () => {
    await set(storageKey, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(custom, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storageKey);
    ignoreUpdates(() => fromJson(data));
  };

  const add = (workout) => {
    custom.value.push(workout);
    triggerRef(custom);
    return custom.value.length - 1;
  };

  const edit = (index, workout) => {
    custom.value[index] = workout;
    triggerRef(custom);
  };

  const remove = (index) => {
    custom.value.splice(index, 1);
    triggerRef(custom);
  };

  return { standard, custom, toJson, fromJson, hydrate, add, edit, remove };
});

function convert(data) {
  const { version, data: workouts } = data;
  switch (version) {
    case 1:
      break;
  }
  return workouts;
}
