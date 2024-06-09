<template>
  <Form>
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
import { Form, FormItem } from '@/components/ui/form';
import { InputNumber } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItemText } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FitnessMachine } from '@/modules/bluetooth/fitnessMachine';
import { HeartRate } from '@/modules/bluetooth/heartRate';
import { useAthleteStore } from '@/stores/athlete';
import { useDevicesStore } from '@/stores/devices';
import { useSettingsStore } from '@/stores/settings';
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
</script>
