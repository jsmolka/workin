<template>
  <Form>
    <Button @click="exportData" blue>Export data</Button>
    <Button @click="importData" blue>Import data</Button>
  </Form>
</template>

<script setup>
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';
import { useActivitiesStore } from '../../stores/activities';
import { useActivityStore } from '../../stores/activity';
import { useAthleteStore } from '../../stores/athlete';
import { useSettingsStore } from '../../stores/settings';
import { useWorkoutsStore } from '../../stores/workouts';
import { download, readFileAsync, selectFileDialog } from '../../utils/filesystem';

const activities = useActivitiesStore();
const activity = useActivityStore();
const athlete = useAthleteStore();
const settings = useSettingsStore();
const workouts = useWorkoutsStore();

const exportData = () => {
  const data = {
    activities: activities.exportData(),
    activity: activity.exportData(),
    athlete: athlete.exportData(),
    settings: settings.exportData(),
    workouts: workouts.exportData(),
  };
  download(JSON.stringify(data), 'backup.json', 'application/json');
};

const importData = async () => {
  const file = await selectFileDialog('json');
  const json = await readFileAsync(file);
  const data = JSON.parse(json);
  activities.importData(data.activities);
  activity.importData(data.activity);
  athlete.importData(data.athlete);
  settings.importData(data.settings);
  workouts.importData(data.workouts);
};
</script>
