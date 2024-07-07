import { Workout } from '@/modules/workout';
import { workouts as standard } from '@/stores/data/workouts';
import { deserialize, serialize } from '@/utils/persist';
import { makeNaturalComparer } from '@/utils/sorting';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';

const id = 'workouts';
const version = 1;

export const useWorkoutsStore = defineStore(id, () => {
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

  const { ignoreUpdates } = watchIgnorable(custom, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => fromJson(data));
  };

  const add = (workout) => {
    custom.value.push(workout);
    custom.value.sort(makeNaturalComparer('name'));
    triggerRef(custom);
    return custom.value.indexOf(workout);
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
  }
  return workouts;
}
