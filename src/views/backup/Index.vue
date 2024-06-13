<template>
  <Form>
    <Button @click="save">Save</Button>
    <Button @click="load">Load</Button>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useActivitiesStore } from '@/stores/activities';
import { useActivityStore } from '@/stores/activity';
import { useAthleteStore } from '@/stores/athlete';
import { useSettingsStore } from '@/stores/settings';
import { useWorkoutsStore } from '@/stores/workouts';
import { download, readAsText, selectFile } from '@/utils/filesystem';

const activities = useActivitiesStore();
const activity = useActivityStore();
const athlete = useAthleteStore();
const settings = useSettingsStore();
const workouts = useWorkoutsStore();

const save = () => {
  const data = {
    activities: activities.toJson(),
    activity: activity.toJson(),
    athlete: athlete.toJson(),
    settings: settings.toJson(),
    workouts: workouts.toJson(),
  };
  download(JSON.stringify(data), 'backup.json', 'application/json');
};

const load = async () => {
  const file = await selectFile('json');
  const json = await readAsText(file);
  const data = JSON.parse(json);
  activities.fromJson(data.activities);
  activity.fromJson(data.activity);
  athlete.fromJson(data.athlete);
  settings.fromJson(data.settings);
  workouts.fromJson(data.workouts);
};
</script>
