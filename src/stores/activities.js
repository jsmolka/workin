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

  const exportData = () => {
    return { version, data: serialize(activities.value) };
  };

  const persist = async () => {
    await set(id, exportData());
  };

  const { ignoreUpdates } = watchIgnorable(activities, persist);

  const importData = (data) => {
    if (data != null && data.version != null) {
      activities.value = deserialize(Activity, convert(data));
    }
  };

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => importData(data));
  };

  const push = (activity) => {
    activities.value.push(activity);
    triggerRef(activities);
    return activities.value.length - 1;
  };

  const remove = (index) => {
    activities.value.splice(index, 1);
    triggerRef(activities);
  };

  return { activities, hydrate, push, remove, importData, exportData };
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
    case 2:
    case 3:
    case 4:
      updatePolylines(activities);
  }
  return activities;
}
