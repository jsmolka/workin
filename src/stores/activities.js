import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { deserialize, serialize } from '../utils/persist';

const id = 'activities';

export const useActivitiesStore = defineStore(id, () => {
  const activities = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      activities.value = deserialize(Activity, data);
    }
  };

  watch(activities, () => set(id, serialize(activities.value)), { deep: true });

  return { activities, hydrate };
});
