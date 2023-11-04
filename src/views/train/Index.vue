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

    <Intervals
      class="w-full bg-gray-8 aspect-[3/1]"
      :intervals="workouts[10].intervals"
      :progress="1700"
    />

    <Label class="flex-1" text="Intervals">
      <div class="relative flex-1 rounded-sm overflow-hidden">
        <div class="absolute inset-0 border border-gray-6 overflow-y-scroll">
          <div
            class="flex justify-between px-2 py-1.5 font-feature-tnum"
            :class="{ 'bg-gray-6': index % 2 === 0, '!bg-blue-3': index === 0 }"
            v-for="(interval, index) in workouts[10].intervals"
          >
            <div>{{ Math.round(athlete.ftp * interval.intensity) }} W</div>
            <div>{{ format(interval.duration) }}</div>
          </div>
        </div>
      </div>
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
import Intervals from '../../components/Intervals.vue';
import Label from '../../components/Label.vue';
import { Time } from '../../modules/time';
import { useAthleteStore } from '../../stores/athlete';
import { useDevicesStore } from '../../stores/devices';
import { useWorkoutsStore } from '../../stores/workouts';
import Stats from './Stats.vue';

const { athlete } = storeToRefs(useAthleteStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());
const { workouts } = storeToRefs(useWorkoutsStore());
const { request, release } = useWakeLock();

onMounted(async () => {
  await request();
});

onUnmounted(async () => {
  await release();
});

const format = (seconds) => {
  return new Time(0, 0, seconds).format();
};

const totalTime = ref(new Time());

const intervalTime = new Time(0, 0, 90);

const targetPower = ref(0);
watch(targetPower, async (value) => {
  if (trainer) {
    await trainer.value.power(value);
  }
});
</script>
