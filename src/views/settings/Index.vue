<template>
  <Form>
    <Label text="Heart rate monitor">
      <DeviceButton v-model:device="hrm" :constructor="HeartRate" v-slot="{ device }">
        {{ device.heartRate !== 0 ? `${device.name} [${device.heartRate} bpm]` : device.name }}
      </DeviceButton>
    </Label>
    <Label text="Smart trainer">
      <DeviceButton v-model:device="trainer" :constructor="FitnessMachine" v-slot="{ device }">
        {{ `${device.name} [${device.powerRange.min} - ${device.powerRange.max} W]` }}
      </DeviceButton>
    </Label>
    <Label text="Height [cm]">
      <InputNumber :min="1" v-model:value="athlete.height" />
    </Label>
    <Label text="Weight [kg]">
      <InputNumber :min="1" v-model:value="athlete.weight" />
    </Label>
    <Label text="FTP [W]">
      <InputNumber :min="1" v-model:value="athlete.ftp" />
    </Label>
    <Label text="Log level">
      <Select :items="log.levels" v-model:value="settings.logLevel">
        <template #item="{ item }">
          <span class="capitalize">
            {{ item }}
          </span>
        </template>
      </Select>
    </Label>
    <Label text="Log as notification">
      <Switch v-model:value="settings.logAsNotification" />
    </Label>
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Form from '../../components/Form.vue';
import InputNumber from '../../components/InputNumber.vue';
import Label from '../../components/Label.vue';
import Select from '../../components/Select.vue';
import Switch from '../../components/Switch.vue';
import { FitnessMachine } from '../../modules/bluetooth/fitnessMachine';
import { HeartRate } from '../../modules/bluetooth/heartRate';
import { useAthleteStore } from '../../stores/athlete';
import { useDevicesStore } from '../../stores/devices';
import { useSettingsStore } from '../../stores/settings';
import { log } from '../../utils/log';
import DeviceButton from './DeviceButton.vue';

const { athlete } = storeToRefs(useAthleteStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());
const { settings } = storeToRefs(useSettingsStore());
</script>
