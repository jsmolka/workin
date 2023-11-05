<template>
  <Form class="h-full">
    <Stats
      :power="trainer?.power"
      :target-power="targetPower"
      :heart-rate="hrm?.heartRate"
      :cadence="trainer?.cadence"
      :interval-time="intervalTime"
      :total-time="totalTime"
    />

    <Graphic
      class="w-full bg-gray-8 aspect-[3/1]"
      :intervals="workouts[10].intervals"
      :seconds="1700"
    />

    <Label class="flex-1" text="Intervals">
      <Intervals class="flex-1" :intervals="workouts[10].intervals" :seconds="currentSeconds" />
    </Label>

    <div class="flex gap-4">
      <Button class="flex-1">Pause</Button>
      <Button class="flex-1">Finish</Button>
    </div>
  </Form>
</template>

<script setup>
import { useWakeLock } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';
import Graphic from '../../components/Graphic.vue';
import Intervals from '../../components/Intervals.vue';
import Label from '../../components/Label.vue';
import { Time } from '../../modules/time';
import { useDevicesStore } from '../../stores/devices';
import { useWorkoutsStore } from '../../stores/workouts';
import Stats from './Stats.vue';

const { hrm, trainer } = storeToRefs(useDevicesStore());
const { workouts } = storeToRefs(useWorkoutsStore());
const { request, release } = useWakeLock();

onMounted(async () => {
  await request();
});

onUnmounted(async () => {
  await release();
});

const currentSeconds = ref(0);

const totalTime = ref(new Time());

const intervalTime = new Time(0, 0, 90);

const targetPower = ref(0);
watch(targetPower, async (value) => {
  if (trainer) {
    await trainer.value.power(value);
  }
});
</script>
