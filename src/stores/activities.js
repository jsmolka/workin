import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { deserialize, serialize } from '../utils/persist';

const id = 'activities';
const version = 1;

export const useActivitiesStore = defineStore(id, () => {
  const activities = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version === version) {
      activities.value = deserialize(Activity, data.data);
    }
  };

  const persist = async () => {
    await set(id, { version, data: serialize(activities.value) });
  };

  watch(activities, persist, { deep: true });

  return { activities, hydrate };
});
