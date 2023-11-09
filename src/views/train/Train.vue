<template>
  <Form class="h-full">
    <Metrics
      :power="trainer?.power"
      :target-power="targetPower"
      :heart-rate="hrm?.heartRate"
      :cadence="trainer?.cadence"
      :interval-time="intervalTime"
      :total-time="currentTime"
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
        <ChartHeartRate :data="activity.data" :max-x="workoutSeconds" />
        <ChartPower :data="activity.data" :max-x="workoutSeconds" />
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
      <Button class="flex-1" @click="start">Start</Button>
      <Button class="flex-1" @click="finish">Finish</Button>
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
import ChartHeartRate from '../../components/chart/ChartHeartRate.vue';
import ChartIntervals from '../../components/chart/ChartIntervals.vue';
import ChartLines from '../../components/chart/ChartLines.vue';
import ChartPower from '../../components/chart/ChartPower.vue';
import ChartProgress from '../../components/chart/ChartProgress.vue';
import { useInterval } from '../../composables/useInterval';
import { DataPoint } from '../../modules/dataPoint';
import { Time } from '../../modules/time';
import { router } from '../../router';
import { useActivitiesStore } from '../../stores/activities';
import { useActivityStore } from '../../stores/activity';
import { useAthleteStore } from '../../stores/athlete';
import { useDevicesStore } from '../../stores/devices';
import Metrics from './Metrics.vue';

const { request, release } = useWakeLock();
onMounted(request);
onUnmounted(release);

const { athlete } = storeToRefs(useAthleteStore());
const { activity } = storeToRefs(useActivityStore());
const { activities } = storeToRefs(useActivitiesStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());

const workout = computed(() => activity.value.workout);
const workoutSeconds = computed(() => workout.value.seconds);
const currentSeconds = computed(() => activity.value.seconds);
const currentTime = computed(() => new Time(0, 0, currentSeconds.value));

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
  watch(
    intervalIndex,
    (index) => {
      if (index != null) {
        intervals.value.scrollTo(index);
      }
    },
    { immediate: true },
  );
});

const interval = computed(() => workout.value.intervals[intervalIndex.value]);
const intervalTime = computed(() => {
  if (interval.value == null) {
    return new Time();
  }
  return new Time(0, 0, interval.value.seconds - (currentSeconds.value % interval.value.seconds));
});

const targetPower = computed(() =>
  interval.value != null ? interval.value.intensity * athlete.value.ftp : null,
);

let stop = null;
const start = async () => {
  // Todo: require to start
  if (trainer.value) {
    await trainer.value.setTargetPower(targetPower.value);
  }

  stop = useInterval(10, () => {
    activity.value.data.push(new DataPoint(targetPower.value, 10, 120));
  });
};

const pause = () => {
  stop();
};

watch(interval, (value) => {
  if (value == null) {
    pause();
  }
});

const finish = async () => {
  const index = activities.value.push(activity.value) - 1;
  activity.value = null;
  router.push({ name: 'activity', params: { index } });
};
</script>
