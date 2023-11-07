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

    <Chart class="aspect-[3/1]">
      <ChartLines />
      <ChartIntervals
        class="pointer-events-none"
        :intervals="workout.intervals"
        :total-seconds="workoutSeconds"
      />
      <ChartProgress :x="currentSeconds" :max-x="workoutSeconds">
        <ChartLines :x2="currentSeconds / workoutSeconds" />
        <ChartData
          :data="data"
          property="power"
          :max-x="workoutSeconds"
          :max-y="2 * athlete.ftp"
          class="stroke-blue-3"
        />
        <ChartData
          :data="data"
          property="heartRate"
          :max-x="workoutSeconds"
          :max-y="2 * athlete.ftp"
          class="stroke-[#bf616a]"
        />
      </ChartProgress>
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
import ChartData from '../../components/chart/ChartData.vue';
import ChartIntervals from '../../components/chart/ChartIntervals.vue';
import ChartLines from '../../components/chart/ChartLines.vue';
import ChartProgress from '../../components/chart/ChartProgress.vue';
import { DataPoint } from '../../modules/dataPoint';
import { Time } from '../../modules/time';
import { useAthleteStore } from '../../stores/athlete';
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

const { athlete } = storeToRefs(useAthleteStore());

const workout = computed(() => workouts.value[0]);

const workoutSeconds = computed(() => workout.value.seconds);

const currentSeconds = ref(660);

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

const getIntervalAtSecond = (seconds) => {
  let totalSeconds = 0;
  for (const interval of workout.value.intervals) {
    totalSeconds += interval.seconds;
    if (seconds < totalSeconds) {
      return interval;
    }
  }
  return null;
};

const data = computed(() => {
  const result = [];
  for (let i = 0; i < currentSeconds.value; i++) {
    const interval = getIntervalAtSecond(i);
    if (interval == null) {
      break;
    }
    result.push(new DataPoint(athlete.value.ftp * interval.intensity, 0, 110));
  }
  return result;
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
