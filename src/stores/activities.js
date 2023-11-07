import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';
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

  const persist = async () => {
    await set(id, serialize(activities.value));
  };

  const add = async (activity) => {
    activities.value.push(activity);
    await persist();
  };

  return { activities, hydrate, add };
});
