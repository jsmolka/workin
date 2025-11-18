import { Activity } from '@/modules/activity';
import { deserialize, serialize } from '@/utils/persist';
import { get, set } from '@/utils/store';
import { watchIgnorable } from '@vueuse/core';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';

export const useActivitiesStore = defineStore('activities', () => {
  const activities = shallowRef([]);

  const toJson = () => {
    return { version: 1, data: activities.value.map((activity) => serialize(activity)) };
  };

  const migrate = (data) => {
    const { version, data: activities } = data;
    switch (version) {
      case 1:
    }
    return activities;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      activities.value = migrate(data).map((activity) => deserialize(Activity, activity));
    }
  };

  const storeKey = 'activities';
  const storeVersion = 1;

  const persist = async () => {
    await set(storeKey, { storeVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(activities, persist);

  const hydrate = async () => {
    const data = await get(storeKey);
    if (data != null && data.storeVersion === storeVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
  };

  const add = (activity) => {
    activities.value.unshift(activity);
    triggerRef(activities);
    return 0;
  };

  const remove = (index) => {
    activities.value.splice(index, 1);
    triggerRef(activities);
  };

  return { activities, toJson, fromJson, hydrate, add, remove };
});
