import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Activity } from '../modules/activity';
import { polylinesHeartRate, polylinesPower } from '../modules/data';
import { deserialize, serialize } from '../utils/persist';
import { useAthleteStore } from './athlete';

const id = 'activities';
const version = 2;

export const useActivitiesStore = defineStore(id, () => {
  const activities = ref([]);

  const hydrate = async () => {
    const data = await get(id);
    if (data != null) {
      activities.value = deserialize(Activity, convert(data).data);
    }
  };

  const persist = async () => {
    await set(id, { version, data: serialize(activities.value) });
  };

  watch(activities, persist, { deep: true });

  return { activities, hydrate };
});

function convert(data) {
  const { version, data: activities } = data;
  switch (version) {
    case 1: {
      const { athlete } = useAthleteStore();
      for (const activity of activities) {
        activity.polylinesPower = polylinesPower(
          activity.data,
          activity.data.length,
          2 * athlete.ftp,
        );
        activity.polylinesHeartRate = polylinesHeartRate(
          activity.data,
          activity.data.length,
          2 * athlete.ftp,
        );
      }
    }
  }
  return data;
}
