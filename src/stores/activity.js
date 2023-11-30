import { useDebounceFn } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { deserialize, serialize } from '../utils/persist';

const id = 'activity';
const version = 1;

export const useActivityStore = defineStore(id, () => {
  const activity = ref(null);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version === version) {
      activity.value = deserialize(Activity, data.data);
    }
  };

  const persist = async () => {
    await set(id, activity.value != null ? { version, data: serialize(activity.value) } : null);
  };

  watch(activity, useDebounceFn(persist, 2000, { maxWait: 10000 }), { deep: true });

  return { activity, hydrate };
});
