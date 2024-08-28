import { Activity } from '@/modules/activity';
import { DataPoints } from '@/modules/data';
import { useAthleteStore } from '@/stores/athlete';
import { deserialize, serialize } from '@/utils/persist';
import { watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { shallowRef, triggerRef } from 'vue';

const version = 6;

export const useActivitiesStore = defineStore('activities', () => {
  const activities = shallowRef([]);

  const toJson = () => {
    return { version, data: activities.value.map((activity) => serialize(activity)) };
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      activities.value = convert(data).map((activity) => deserialize(Activity, activity));
    }
  };

  const storageKey = 'activities';

  const persist = async () => {
    await set(storageKey, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(activities, persist);

  const hydrate = async () => {
    const data = await get(storageKey);
    ignoreUpdates(() => fromJson(data));
  };

  const add = (activity) => {
    activities.value.unshift(activity);
    triggerRef(activities);
    return 0;
  };

  const remove = (index) => {
    activities.value.splice(index, 1);
    triggerRef(activities);
  };

  return { activities, toJson, fromJson, hydrate, add, remove };
});

function updatePolylines(activities) {
  const { athlete } = useAthleteStore();
  for (const activity of activities) {
    const data = new DataPoints(activity.data);
    activity.polylinesPower = data.polylinesPower(data.length, 2 * athlete.ftp);
    activity.polylinesHeartRate = data.polylinesHeartRate(data.length);
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
      break;
    case 5:
      activities.reverse();
      break;
  }
  return activities;
}
