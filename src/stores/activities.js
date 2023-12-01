import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';
import { Activity } from '../modules/activity';
import { polylinesHeartRate, polylinesPower } from '../modules/data';
import { deserialize, serialize } from '../utils/persist';
import { useAthleteStore } from './athlete';

const id = 'activities';
const version = 5;

export const useActivitiesStore = defineStore(id, () => {
  const activities = shallowRef([]);

  const persist = async () => {
    await set(id, { version, data: serialize(activities.value) });
  };

  const { ignoreUpdates } = watchIgnorable(activities, persist);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      ignoreUpdates(() => {
        activities.value = deserialize(Activity, convert(data).data);
      });
    }
  };

  const push = (activity) => {
    activities.value.push(activity);
    triggerRef(activities);
    return activities.value.length - 1;
  };

  return { activities, hydrate, push };
});

function updatePolylines(activities) {
  const { athlete } = useAthleteStore();
  for (const activity of activities) {
    activity.polylinesPower = polylinesPower(activity.data, activity.data.length, 2 * athlete.ftp);
    activity.polylinesHeartRate = polylinesHeartRate(activity.data, activity.data.length);
  }
}

function convert(data) {
  const { version, data: activities } = data;
  switch (version) {
    case 1:
      updatePolylines(activities);
    case 2:
      updatePolylines(activities);
    case 3:
      updatePolylines(activities);
    case 4:
      updatePolylines(activities);
  }
  return data;
}
