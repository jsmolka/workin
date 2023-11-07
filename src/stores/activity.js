import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { deserialize, serialize } from '../utils/persist';
import { useActivitiesStore } from './activities';

const id = 'activity';

export const useActivityStore = defineStore(id, () => {
  const activity = ref(null);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      activity.value = deserialize(Activity, data);
    }
  };

  const persist = async () => {
    await set(id, activity.value != null ? serialize(activity.value) : null);
  };

  watch(activity, persist, { deep: true });

  const setActivity = (value) => {
    if (activity.value?.seconds > 0) {
      const store = useActivitiesStore();
      store.add(activity.value);
    }
    activity.value = value;
  };

  return { activity, hydrate, setActivity };
});
