<template>
  <Form class="p-4">
    <FormItem>
      <Label>Smart trainer</Label>
      <DeviceButton
        :device="trainer"
        @update:device="setTrainer"
        :constructor="FitnessMachine"
        v-slot="{ device }"
      >
        {{ `${device.name} [${device.powerRange.min} - ${device.powerRange.max} W]` }}
      </DeviceButton>
    </FormItem>

    <FormItem>
      <Label>Heart rate monitor</Label>
      <DeviceButton v-model:device="hrm" :constructor="HeartRate" v-slot="{ device }">
        {{ device.heartRate != null ? `${device.name} [${device.heartRate} bpm]` : device.name }}
      </DeviceButton>
    </FormItem>

    <FormItem>
      <Label>FTP</Label>
      <InputNumber v-model="athlete.ftp" :min="1" :max="500" suffix=" W" />
    </FormItem>

    <FormItem>
      <Label>Backup</Label>
      <FormItem class="grid grid-cols-2">
        <Button variant="secondary" @click="exportBackup">Export</Button>
        <Button variant="secondary" @click="importBackup">Import</Button>
      </FormItem>
    </FormItem>

    <FormItem>
      <Label>Log level</Label>
      <Select :items="log.levels" v-model="settings.logLevel">
        <template #item="{ item }">
          <SelectItemText>
            <span class="capitalize">{{ item }}</span>
          </SelectItemText>
        </template>
      </Select>
    </FormItem>

    <FormItem>
      <Label>Log as notification</Label>
      <Switch v-model="settings.logAsNotification" />
    </FormItem>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Form, FormItem } from '@/components/ui/form';
import { InputNumber } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItemText } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FitnessMachine } from '@/modules/bluetooth/fitnessMachine';
import { HeartRate } from '@/modules/bluetooth/heartRate';
import { useActivitiesStore } from '@/stores/activities';
import { useActivityStore } from '@/stores/activity';
import { useAthleteStore } from '@/stores/athlete';
import { useDevicesStore } from '@/stores/devices';
import { useSettingsStore } from '@/stores/settings';
import { useWorkoutsStore } from '@/stores/workouts';
import { download, readAsText, selectFile } from '@/utils/filesystem';
import { log } from '@/utils/log';
import { toast } from '@/utils/toast';
import DeviceButton from '@/views/settings/DeviceButton.vue';
import { storeToRefs } from 'pinia';

const { athlete } = storeToRefs(useAthleteStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());
const { settings } = storeToRefs(useSettingsStore());

const setTrainer = (device) => {
  if (device == null) {
    return;
  }
  if (!device.supportsPower) {
    toast(`${device.name} does not support power`);
    device.disconnect();
    return;
  }
  trainer.value = device;
};

const exportBackup = () => {
  const activities = useActivitiesStore();
  const activity = useActivityStore();
  const athlete = useAthleteStore();
  const settings = useSettingsStore();
  const workouts = useWorkoutsStore();

  const data = {
    activities: activities.toJson(),
    activity: activity.toJson(),
    athlete: athlete.toJson(),
    settings: settings.toJson(),
    workouts: workouts.toJson(),
  };
  download(JSON.stringify(data), 'backup.json', 'application/json');
};

const importBackup = async () => {
  const activities = useActivitiesStore();
  const activity = useActivityStore();
  const athlete = useAthleteStore();
  const settings = useSettingsStore();
  const workouts = useWorkoutsStore();

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
