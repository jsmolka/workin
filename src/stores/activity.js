import { useDebounceFn, watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Activity } from '../modules/activity';
import {
  averageCadence,
  averageHeartRate,
  averagePower,
  polylinesHeartRate,
  polylinesPower,
} from '../modules/data';
import { deserialize, serialize } from '../utils/persist';
import { useActivitiesStore } from './activities';
import { useAthleteStore } from './athlete';

const id = 'activity';
const version = 1;

export const useActivityStore = defineStore(id, () => {
  const activity = ref(null);

  const exportData = () => {
    return activity.value != null ? { version, data: serialize(activity.value) } : null;
  };

  const persist = async () => {
    await set(id, exportData());
  };

  const { ignoreUpdates } = watchIgnorable(
    activity,
    useDebounceFn(persist, 1500, { maxWait: 10000 }),
    { deep: true },
  );

  const importData = (data) => {
    if (data != null && data.version != null) {
      activity.value = deserialize(Activity, data.data);
    }
  };

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => importData(data));
  };

  const finish = () => {
    const { athlete } = useAthleteStore();

    const value = activity.value;
    value.averagePower = averagePower(value.data);
    value.averageHeartRate = averageHeartRate(value.data);
    value.averageCadence = averageCadence(value.data);
    value.polylinesPower = polylinesPower(value.data, value.data.length, 2 * athlete.ftp);
    value.polylinesHeartRate = polylinesHeartRate(value.data, value.data.length);

    const store = useActivitiesStore();
    const index = store.add(value);
    activity.value = null;
    return index;
  };

  return { activity, hydrate, finish, importData, exportData };
});
