import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { deserialize, serialize } from '../utils/persist';

const id = 'activity';

export const useActivityStore = defineStore(id, () => {
  const activity = ref(null);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      activity.value = deserialize(Activity, data);
    }
  };

  watch(activity, async () => await set(id, serialize(activity.value)), { deep: true });

  return { activity, hydrate };
});
