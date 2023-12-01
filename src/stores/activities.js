import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { polylinesHeartRate, polylinesPower } from '../modules/data';
import { deserialize, serialize } from '../utils/persist';
import { useAthleteStore } from './athlete';

const id = 'activities';
const version = 4;

export const useActivitiesStore = defineStore(id, () => {
  const activities = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null && data.version != null) {
      activities.value = deserialize(Activity, convert(data).data);
    }
  };

  const persist = async () => {
    await set(id, { version, data: serialize(activities.value) });
  };

  watch(activities, persist, { deep: true });

  return { activities, hydrate };
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
  }
  return data;
}
