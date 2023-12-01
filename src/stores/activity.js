import { useDebounceFn } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
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

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      activity.value = deserialize(Activity, data.data);
    }
  };

  const persist = async () => {
    await set(id, activity.value != null ? { version, data: serialize(activity.value) } : null);
  };

  watch(activity, useDebounceFn(persist, 2000, { maxWait: 10000 }), { deep: true });

  const finish = () => {
    const { athlete } = useAthleteStore();
    const { activities } = useActivitiesStore();

    const value = activity.value;
    value.averagePower = averagePower(value.data);
    value.averageHeartRate = averageHeartRate(value.data);
    value.averageCadence = averageCadence(value.data);
    value.polylinesPower = polylinesPower(value.data, value.data.length, 2 * athlete.ftp);
    value.polylinesHeartRate = polylinesHeartRate(value.data, value.data.length);
    activities.push(value);

    activity.value = null;
  };

  return { activity, hydrate, finish };
});
