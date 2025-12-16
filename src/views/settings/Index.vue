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
        {{ device.power != null ? `${device.name} [${device.power} W]` : device.name }}
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
      <Label>Strava Client ID</Label>
      <Input
        :model-value="strava.clientId"
        @update:model-value="
          strava.clientId = $event;
          strava.token = null;
        "
      />
    </FormItem>

    <FormItem>
      <Label>Strava Client Secret</Label>
      <Input
        :model-value="strava.clientSecret"
        @update:model-value="
          strava.clientSecret = $event;
          strava.token = null;
        "
        type="password"
        autocomplete="one-time-code"
      />
    </FormItem>

    <FormItem>
      <Label>Strava</Label>
      <Button
        variant="secondary"
        :disabled="!strava.isAuthorizeEnabled || authorizing"
        @click="authorize"
      >
        {{ authorizing ? 'Authorizing...' : strava.isAuthorized ? 'Authorized' : 'Authorize' }}
      </Button>
    </FormItem>

    <FormItem>
      <Label>Backup</Label>
      <FormGrid>
        <Button variant="secondary" @click="exportBackup">Export</Button>
        <Button variant="secondary" @click="importBackup">Import</Button>
      </FormGrid>
    </FormItem>

    <FormItem>
      <Label>Log level</Label>
      <Select :items="log.levels" v-model="settings.logLevel" :display-expr="capitalize" />
    </FormItem>

    <FormItem>
      <Label>Log as notification</Label>
      <Switch v-model="settings.logAsNotification" />
    </FormItem>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { dialog } from '@/components/ui/dialog';
import { Form, FormGrid, FormItem } from '@/components/ui/form';
import { Input, InputNumber } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAsyncFn } from '@/composables/useAsyncFn';
import { FitnessMachine } from '@/modules/bluetooth/fitnessMachine';
import { HeartRate } from '@/modules/bluetooth/heartRate';
import { useStores } from '@/stores';
import { useAthleteStore } from '@/stores/athlete';
import { useDevicesStore } from '@/stores/devices';
import { useSettingsStore } from '@/stores/settings';
import { useStravaStore } from '@/stores/strava';
import { download, readAsText, selectFile } from '@/utils/filesystem';
import { log } from '@/utils/log';
import { toast } from '@/utils/toast';
import BluetoothDeviceButton from '@/views/settings/BluetoothDeviceButton.vue';
import CodeDialog from '@/views/settings/CodeDialog.vue';
import { capitalize } from 'lodash-es';
import { storeToRefs } from 'pinia';

const { athlete } = storeToRefs(useAthleteStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());
const { settings } = storeToRefs(useSettingsStore());
const { strava } = storeToRefs(useStravaStore());

const setTrainer = (device) => {
  if (device == null) {
    return;
  }
  if (!device.supportsPower) {
    toast(`${device.name} does not support power.`, { type: 'error' });
    device.disconnect();
    return;
  }
  trainer.value = device;
};

const [authorize, authorizing] = useAsyncFn(async () => {
  strava.value.token = null;

  window.open(strava.value.authorizeUrl, '_blank');

  const code = await dialog({}, CodeDialog);
  if (code == null) {
    return;
  }
  await strava.value.authenticate(code);
});

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
