import { Activity } from '@/modules/activity';
import { deserialize, serialize } from '@/utils/persist';
import { get, set } from '@/utils/store';
import { useDebounceFn, watchIgnorable } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActivityStore = defineStore('activity', () => {
  const activity = ref(null);

  const toJson = () => {
    return activity.value != null ? { version: 1, data: serialize(activity.value) } : null;
  };

  const migrate = (data) => {
    const { version, data: activity } = data;
    switch (version) {
      case 1:
    }
    return activity;
  };

  const fromJson = (data) => {
    if (data == null) {
      activity.value = null;
    } else if (data.version != null) {
      activity.value = deserialize(Activity, migrate(data));
    }
  };

  const storeKey = 'activity';
  const storeVersion = 1;

  const persist = async () => {
    await set(storeKey, { storeVersion, data: toJson() });
  };

  const { ignoreUpdates } = watchIgnorable(
    activity,
    useDebounceFn(persist, 1500, { maxWait: 10000 }),
    { deep: true },
  );

  const hydrate = async () => {
    const data = await get(storeKey);
    if (data != null && data.storeVersion === storeVersion) {
      ignoreUpdates(() => fromJson(data.data));
    }
  };

  return { activity, toJson, fromJson, hydrate };
});
