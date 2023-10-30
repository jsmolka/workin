<template>
  <div class="flex flex-col gap-4">
    <Stats
      :power="trainer.power"
      :target-power="targetPower"
      :heart-rate="hrm.heartRate"
      :cadence="trainer.cadence"
      :interval-time="intervalTime"
      :total-time="totalTime"
    />

    <Form>
      <Label text="Target power">
        <InputNumber :min="trainer.powerMin" :max="trainer.powerMax" v-model:value="targetPower" />
      </Label>
    </Form>
  </div>
</template>

<script setup>
import { useWakeLock } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Form from '../../components/Form.vue';
import InputNumber from '../../components/InputNumber.vue';
import Label from '../../components/Label.vue';
import { useInterval } from '../../composables/useInterval';
import { Time } from '../../modules/time';
import { useDevicesStore } from '../../stores/devices';
import { notify } from '../../utils/notify';
import Stats from './Stats.vue';

const { hrm, trainer } = storeToRefs(useDevicesStore());
const { request, release } = useWakeLock();

onMounted(async () => {
  await request();
});

onUnmounted(async () => {
  await release();
});

const totalTime = ref(new Time());
useInterval(1000, () => {
  const time = totalTime.value.clone();
  time.addSeconds(1);
  totalTime.value = time;
});

const intervalTime = new Time(0, 0, 90);

const targetPower = ref(0);
watchEffect(async () => {
  if (trainer.value.isConnected) {
    const value = await trainer.value.setPower(targetPower.value);
    notify.info(String(value));
  }
});
</script>
