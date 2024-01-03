<template>
  <Form class="h-full">
    <!-- prettier-ignore -->
    <div class="grid grid-rows-3 sm:grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-4 font-feature-tnum">
      <Metric class="order-1 sm:order-1" text="Power" :value="trainer?.power" />
      <Metric class="order-5 sm:order-2" text="Interval time" :value="formatSeconds(currentIntervalSeconds)" />
      <Metric class="order-2 sm:order-3" text="Heart rate" :value="hrm?.heartRate" />
      <Metric class="order-3 sm:order-4" text="Target power" :value="targetPower" />
      <Metric class="order-6 sm:order-5" text="Total time" :value="formatSeconds(currentSeconds)" />
      <Metric class="order-4 sm:order-6" text="Cadence" :value="trainer?.cadence" />
    </div>
    <Chart class="shrink-0 aspect-[5/2]">
      <ChartLines />
      <ChartIntervals class="pointer-events-none" :intervals="workout.intervals" />
      <ChartProgress :x="currentSeconds" :max-x="workoutSeconds" v-slot="{ x }">
        <ChartLines :x="[0, x]" />
        <ChartHeartRate :polylines="polylinesHeartRate(activity.data, workoutSeconds)" />
        <ChartPower :polylines="polylinesPower(activity.data, workoutSeconds, 2 * athlete.ftp)" />
      </ChartProgress>
    </Chart>
    <Label class="flex-1" text="Intervals">
      <Intervals
        ref="table"
        class="flex-1 [&_*]:cursor-default"
        :intervals="workout.intervals"
        :selection="currentIntervalIndex"
        @update:selection=""
      />
    </Label>
    <div class="flex gap-4">
      <Button class="flex-1" @click="toggle" blue>{{ toggleText }}</Button>
      <Button class="flex-1" @click="finish" v-show="activity.seconds > 0 && stopped" blue>
        Finish
      </Button>
    </div>
  </Form>
</template>

<script setup>
import { useEventListener, useWakeLock } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
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
import { polylinesHeartRate, polylinesPower } from '../../modules/data';
import { router } from '../../router';
import { useActivityStore } from '../../stores/activity';
import { useAthleteStore } from '../../stores/athlete';
import { useDevicesStore } from '../../stores/devices';
import { dialog } from '../../utils/dialog';
import { interval } from '../../utils/interval';
import { formatSeconds } from '../../utils/time';
import Metric from './Metric.vue';

const wakeLock = useWakeLock();
onMounted(() => wakeLock.request());
onUnmounted(() => wakeLock.release());

const { athlete } = storeToRefs(useAthleteStore());
const { activity } = storeToRefs(useActivityStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());

const workout = computed(() => activity.value.workout);
const workoutSeconds = computed(() => workout.value.seconds);
const currentSeconds = computed(() => activity.value.seconds);

const currentIntervalData = computed(() => {
  let totalSeconds = 0;
  for (const [index, interval] of workout.value.intervals.entries()) {
    totalSeconds += interval.seconds;
    if (currentSeconds.value < totalSeconds) {
      return { index, interval, totalSeconds };
    }
  }
  return null;
});

const currentInterval = computed(() => currentIntervalData.value?.interval);
const currentIntervalIndex = computed(() => currentIntervalData.value?.index);
const currentIntervalSeconds = computed(() => {
  if (currentIntervalData.value == null) {
    return null;
  }
  return currentIntervalData.value.totalSeconds - currentSeconds.value;
});

const table = ref();

onMounted(() => {
  watch(
    currentIntervalIndex,
    (index) => {
      if (index != null) {
        table.value.scrollTo(index);
      }
    },
    { immediate: true },
  );
});

const targetPower = computed(() => {
  if (currentInterval.value == null) {
    return null;
  }
  return Math.round(athlete.value.ftp * currentInterval.value.intensity);
});

const setTargetPower = () => {
  trainer.value?.setTargetPower(targetPower.value ?? 0);
};

watch(targetPower, setTargetPower, { immediate: true });

const stopInterval = ref(null);
const stopped = computed(() => stopInterval.value == null);

const start = async () => {
  clearAutoStart();

  if (trainer.value == null) {
    const value = await dialog('No smart trainer connected.', [
      { text: 'Cancel', value: 'cancel' },
      { text: 'Settings', value: 'settings', blue: true },
    ]);
    if (value === 'settings') {
      router.push('/settings');
    }
    return;
  }

  if (activity.value.seconds === 0) {
    activity.value.date = new Date();
  }

  stopInterval.value?.();
  stopInterval.value = interval(1000, () => {
    activity.value.data.push([trainer.value.power, hrm.value?.heartRate, trainer.value.cadence]);
  });
};

let autoStart = null;

const clearAutoStart = () => {
  if (autoStart != null) {
    clearTimeout(autoStart);
  }
  autoStart = null;
};

watch(
  () => trainer.value?.power ?? 0,
  (newPower, oldPower) => {
    if (!stopped.value) {
      return;
    }

    if (oldPower === 0 && newPower > 0) {
      autoStart = setTimeout(start, 5000);
    } else if (newPower === 0) {
      clearAutoStart();
    }
  },
);

onUnmounted(clearAutoStart);

const stop = () => {
  clearAutoStop();

  stopInterval.value?.();
  stopInterval.value = null;
};

onUnmounted(stop);

useEventListener(document, 'visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    stop();
  }
});

watch(trainer, (value) => {
  if (value == null) {
    stop();
  }
});

let autoStop = 0;

const clearAutoStop = () => {
  if (autoStop != null) {
    clearTimeout(autoStop);
  }
  autoStop = null;
};

watch(
  () => trainer.value?.power ?? 0,
  (newPower, oldPower) => {
    if (stopped.value) {
      return;
    }

    if (newPower === 0 && oldPower > 0) {
      autoStop = setTimeout(stop, 5000);
    } else if (newPower > 0) {
      clearAutoStop();
    }
  },
);

onUnmounted(clearAutoStop);

const toggle = () => {
  if (stopped.value) {
    start();
  } else {
    stop();
  }
};

const toggleText = computed(() => {
  if (stopped.value) {
    return activity.value.seconds === 0 ? 'Start' : 'Resume';
  } else {
    return 'Pause';
  }
});

const finish = () => {
  stop();

  const store = useActivityStore();
  const index = store.finish();
  router.push(`/activities/${index}`);
};

watchEffect(() => {
  if (currentSeconds.value === workoutSeconds.value) {
    finish();
  }
});
</script>
