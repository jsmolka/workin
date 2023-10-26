<template>
  <Form>
    <Label text="Heart rate monitor">
      <DeviceButton :device="hrm" v-slot="{ device }">
        {{
          device.heartRate != null
            ? device.device.name + ` [${device.heartRate} bpm]`
            : device.device.name
        }}
      </DeviceButton>
    </Label>
    <Label text="Smart trainer">
      <DeviceButton :device="trainer" />
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
  </Form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Form from '../../components/Form.vue';
import InputNumber from '../../components/InputNumber.vue';
import Label from '../../components/Label.vue';
import { useAthleteStore } from '../../stores/athlete';
import { useDevicesStore } from '../../stores/devices';
import DeviceButton from './DeviceButton.vue';

const { athlete } = storeToRefs(useAthleteStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());
</script>
