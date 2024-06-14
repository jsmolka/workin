<template>
  <Form class="p-4">
    <FormItem>
      <Label>Smart trainer</Label>
      <BluetoothDeviceButton
        :device="trainer"
        @update:device="setTrainer"
        :constructor="FitnessMachine"
        v-slot="{ device }"
      >
        {{ `${device.name} [${device.powerRange.min} - ${device.powerRange.max} W]` }}
      </BluetoothDeviceButton>
    </FormItem>

    <FormItem>
      <Label>Heart rate monitor</Label>
      <BluetoothDeviceButton v-model:device="hrm" :constructor="HeartRate" v-slot="{ device }">
        {{ device.heartRate != null ? `${device.name} [${device.heartRate} bpm]` : device.name }}
      </BluetoothDeviceButton>
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
import { useStores } from '@/stores';
import { useAthleteStore } from '@/stores/athlete';
import { useDevicesStore } from '@/stores/devices';
import { useSettingsStore } from '@/stores/settings';
import { download, readAsText, selectFile } from '@/utils/filesystem';
import { log } from '@/utils/log';
import { toast } from '@/utils/toast';
import BluetoothDeviceButton from '@/views/settings/BluetoothDeviceButton.vue';
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

const stores = useStores();

const exportBackup = () => {
  const json = stores.toJson();
  const data = JSON.stringify(json);
  download(data, 'workin.json', 'application/json');
};

const importBackup = async () => {
  const file = await selectFile('json');
  const json = await readAsText(file);
  const data = JSON.parse(json);
  stores.fromJson(data);
};
</script>
