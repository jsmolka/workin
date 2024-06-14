import { Activity } from '@/modules/activity';
import { useActivitiesStore } from '@/stores/activities';
import { useAthleteStore } from '@/stores/athlete';
import { deserialize, serialize } from '@/utils/persist';
import { useDebounceFn, watchIgnorable } from '@vueuse/core';
import { get, set } from 'idb-keyval';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const id = 'activity';
const version = 1;

export const useActivityStore = defineStore(id, () => {
  const activity = ref(null);

  const toJson = () => {
    return activity.value != null ? { version, data: serialize(activity.value) } : null;
  };

  const fromJson = (data) => {
    if (data != null && data.version != null) {
      activity.value = deserialize(Activity, convert(data));
    }
  };

  const persist = async () => {
    await set(id, toJson());
  };

  const { ignoreUpdates } = watchIgnorable(
    activity,
    useDebounceFn(persist, 1500, { maxWait: 10000 }),
    { deep: true },
  );

  const hydrate = async () => {
    const data = await get(id);
    ignoreUpdates(() => fromJson(data));
  };

  const finish = () => {
    const { athlete } = useAthleteStore();

    const value = activity.value;
    value.averagePower = value.data.averagePower();
    value.averageHeartRate = value.data.averageHeartRate();
    value.averageCadence = value.data.averageCadence();
    value.polylinesPower = value.data.polylinesPower(value.data.length, 2 * athlete.ftp);
    value.polylinesHeartRate = value.data.polylinesHeartRate(value.data.length);

    const store = useActivitiesStore();
    const index = store.add(value);
    activity.value = null;
    return index;
  };

  return { activity, toJson, fromJson, hydrate, finish };
});

function convert(data) {
  const { version, data: activity } = data;
  switch (version) {
  }
  return activity;
}
