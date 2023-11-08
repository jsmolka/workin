<template>
  <Form class="h-full">
    <Metrics
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
          :data="activity.data"
          property="power"
          :max-x="workoutSeconds"
          :max-y="2 * athlete.ftp"
          class="stroke-blue-3"
        />
        <ChartData
          :data="activity.data"
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
        :selection="intervalIndex"
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
import { Time } from '../../modules/time';
import { useActivityStore } from '../../stores/activity';
import { useAthleteStore } from '../../stores/athlete';
import { useDevicesStore } from '../../stores/devices';
import Metrics from './Metrics.vue';

const { athlete } = storeToRefs(useAthleteStore());
const { activity } = storeToRefs(useActivityStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());

const { request, release } = useWakeLock();

onMounted(async () => {
  await request();
});

onUnmounted(async () => {
  await release();
});

const workout = computed(() => activity.value.workout);
const workoutSeconds = computed(() => workout.value.seconds);
const currentSeconds = computed(() => activity.value.seconds);

const intervalIndex = computed(() => {
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
  watch(intervalIndex, (index) => {
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
