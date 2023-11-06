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

    <Chart class="bg-gray-8 aspect-[3/1] pointer-events-none" :intervals="workout.intervals">
      <template v-slot="{ totalSeconds }">
        <ChartProgress :seconds="currentSeconds" :total-seconds="totalSeconds" />
      </template>
    </Chart>

    <Label class="flex-1" text="Intervals">
      <Intervals
        ref="intervals"
        class="flex-1"
        :intervals="workout.intervals"
        :selection="currentIntervalIndex"
      />
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import Button from '../../components/Button.vue';
import Form from '../../components/Form.vue';
import Intervals from '../../components/Intervals.vue';
import Label from '../../components/Label.vue';
import Chart from '../../components/chart/Chart.vue';
import ChartProgress from '../../components/chart/ChartProgress.vue';
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

const workout = computed(() => workouts.value[10]);

const currentSeconds = ref(1700);

const currentIntervalIndex = computed(() => {
  let totalSeconds = 0;
  for (const [i, { seconds }] of workout.value.intervals.entries()) {
    totalSeconds += seconds;
    if (currentSeconds.value < totalSeconds) {
      return i;
    }
  }
  return null;
});

const intervals = ref();

onMounted(() => {
  watch(currentIntervalIndex, (index) => {
    intervals.value.scrollTo(index);
  });
});

const totalTime = ref(new Time());

const intervalTime = new Time(0, 0, 90);

const targetPower = ref(0);
watch(targetPower, async (value) => {
  if (trainer) {
    await trainer.value.power(value);
  }
});
</script>
