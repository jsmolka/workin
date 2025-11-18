import { Workout } from '@/modules/workout';
import { workouts as standard } from '@/stores/data/workouts';
import { deserialize, serialize } from '@/utils/persist';
import { get, set } from '@/utils/store';
import { watchIgnorable } from '@vueuse/core';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';

export const useWorkoutsStore = defineStore('workouts', () => {
  const custom = shallowRef([]);

  const toJson = () => {
    return { version: 1, data: custom.value.map((workout) => serialize(workout)) };
  };

  const migrate = (data) => {
    const { version, data: workouts } = data;
    switch (version) {
      case 1:
        break;
    }
    return workouts;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      custom.value = migrate(data).map((workout) => deserialize(Workout, workout));
    }
  };

  const storeKey = 'workouts';
  const storeVersion = 1;

  const persist = async () => {
    await set(storeKey, { storeVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(custom, persist, { deep: true });

  const hydrate = async () => {
    const data = await get(storeKey);
    if (data != null && data.storeVersion === storeVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
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
