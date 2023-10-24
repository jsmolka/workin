<template>
  <Form>
    <Label text="Heart rate monitor">
      <DeviceButton :device="hrm" />
    </Label>
    <Label text="Smart trainer">
      <DeviceButton :device="hrm" />
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
import { reactive, watchEffect } from 'vue';
import { HeartRateMonitor } from '../../bluetooth/heartRateMonitor';
import Form from '../../components/Form.vue';
import InputNumber from '../../components/InputNumber.vue';
import Label from '../../components/Label.vue';
import { useBluetooth } from '../../composables/useBluetooth';
import { useAthleteStore } from '../../stores/athlete';
import { notify } from '../../utils/notify';
import DeviceButton from './DeviceButton.vue';

const { athlete } = storeToRefs(useAthleteStore());

const hrm = reactive(new HeartRateMonitor());

const { available } = useBluetooth();

watchEffect(() => {
  if (available.value === false) {
    notify('Bluetooth is not available');
  }
});
</script>
