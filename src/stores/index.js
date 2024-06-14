import { useActivitiesStore } from '@/stores/activities';
import { useActivityStore } from '@/stores/activity';
import { useAthleteStore } from '@/stores/athlete';
import { useSettingsStore } from '@/stores/settings';
import { useWorkoutsStore } from '@/stores/workouts';

export function useStores() {
  const stores = {
    activities: useActivitiesStore(),
    activity: useActivityStore(),
    athlete: useAthleteStore(),
    settings: useSettingsStore(),
    workouts: useWorkoutsStore(),
  };

  const toJson = () => {
    const data = {};
    for (const [key, store] of Object.entries(stores)) {
      data[key] = store.toJson();
    }
    return data;
  };

  const fromJson = (data) => {
    for (const [key, store] of Object.entries(stores)) {
      store.fromJson(data[key]);
    }
  };

  const hydrate = async () => {
    for (const store of Object.values(stores)) {
      await store.hydrate();
    }
  };

  return { toJson, fromJson, hydrate };
}
