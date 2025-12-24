<template>
  <Form class="p-4">
    <!-- prettier-ignore -->
    <div class="grid grid-rows-3 sm:grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-4">
      <Metric class="order-1 sm:order-1" text="Power" :value="trainer?.power" />
      <Metric class="order-5 sm:order-2" text="Interval time" :value="formatSeconds(currentIntervalSeconds)" />
      <Metric class="order-2 sm:order-3" text="Heart rate" :value="hrm?.heartRate" />
      <Metric class="order-3 sm:order-4" text="Target power" :value="targetPower" />
      <Metric class="order-6 sm:order-5" text="Total time" :value="formatSeconds(currentSeconds)" />
      <Metric class="order-4 sm:order-6" text="Cadence" :value="trainer?.cadence" />
    </div>

    <div class="relative">
      <Chart class="aspect-5/2 shrink-0 border">
        <ChartLines />
        <ChartIntervals class="pointer-events-none" :intervals="workout.intervals" />
        <ChartProgress :x="currentSeconds" :max-x="workoutSeconds" v-slot="{ x }">
          <ChartLines :x="[0, x]" />
          <ChartHeartRate :polylines="activity.records.polylinesHeartRate(workoutSeconds)" />
          <ChartPower
            :polylines="activity.records.polylinesPower(2 * athlete.ftp, workoutSeconds)"
          />
        </ChartProgress>
      </Chart>

      <div
        v-if="currentInterval?.description"
        class="absolute top-0 flex h-1/4 items-center"
        style="container-type: size"
        :style="{
          left:
            currentSeconds / workoutSeconds <= 0.5
              ? 100 * (currentSeconds / workoutSeconds) + '%'
              : undefined,
          right:
            currentSeconds / workoutSeconds > 0.5
              ? 100 * (1 - currentSeconds / workoutSeconds) + '%'
              : undefined,
        }"
      >
        <span class="px-2 font-bold" style="font-size: clamp(0px, 100cqh, var(--text-4xl))">
          {{ currentInterval.description }}
        </span>
      </div>
    </div>

    <FormItem class="flex-1">
      <Label>Intervals</Label>
      <Intervals
        ref="table"
        class="flex-1 [&_tr]:pointer-events-none"
        :items="workout.intervals"
        :selected-index="currentIntervalIndex"
      />
    </FormItem>

    <div class="grid auto-cols-fr grid-flow-col gap-4">
      <Button @click="toggle">{{ toggleText }}</Button>
      <Button @click="finish" v-show="activity.seconds > 0 && stopped">Finish</Button>
    </div>
  </Form>
</template>

<script setup>
import {
  Chart,
  ChartHeartRate,
  ChartIntervals,
  ChartLines,
  ChartPower,
  ChartProgress,
} from '@/components/chart';
import Intervals from '@/components/Intervals.vue';
import { Button } from '@/components/ui/button';
import { dialog } from '@/components/ui/dialog';
import { Form, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Record } from '@/modules/record';
import { router } from '@/router';
import { useActivitiesStore } from '@/stores/activities';
import { useActivityStore } from '@/stores/activity';
import { useAthleteStore } from '@/stores/athlete';
import { useDevicesStore } from '@/stores/devices';
import { interval } from '@/utils/interval';
import { formatSeconds } from '@/utils/time';
import Metric from '@/views/train/Metric.vue';
import { useDocumentVisibility, whenever } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

const { athlete } = storeToRefs(useAthleteStore());
const { activity } = storeToRefs(useActivityStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());

const workout = computed(() => {
  return activity.value.workout;
});

const workoutSeconds = computed(() => {
  return workout.value.seconds;
});

const currentSeconds = computed(() => {
  return activity.value.seconds;
});

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

const currentInterval = computed(() => {
  return currentIntervalData.value?.interval;
});

const currentIntervalIndex = computed(() => {
  return currentIntervalData.value?.index;
});

const currentIntervalSeconds = computed(() => {
  if (currentIntervalData.value == null) {
    return null;
  }
  return currentIntervalData.value.totalSeconds - currentSeconds.value;
});

const table = useTemplateRef('table');

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
const stopped = computed(() => {
  return stopInterval.value == null;
});

const start = async () => {
  clearAutoStart();

  if (trainer.value == null) {
    const button = await dialog({
      content: 'No smart trainer connected.',
      buttons: [
        { text: 'Settings', variant: 'default' },
        { text: 'Cancel', variant: 'secondary' },
      ],
    });
    if (button === 0) {
      router.push('/settings');
    }
    return;
  }

  if (activity.value.seconds === 0) {
    activity.value.date = new Date();
  }

  stopInterval.value?.();
  stopInterval.value = interval(1000, () => {
    activity.value.records.push(
      new Record(trainer.value.power, hrm.value?.heartRate ?? null, trainer.value.cadence),
    );
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

const visibility = useDocumentVisibility();

whenever(() => visibility.value === 'hidden' || trainer.value == null, stop);

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

  activity.value.finish(athlete.value.ftp);

  const store = useActivitiesStore();
  const index = store.add(activity.value);

  activity.value = null;

  router.push(`/activities/${index}`);
};

whenever(() => currentSeconds.value === workoutSeconds.value, finish);
</script>
