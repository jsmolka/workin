<template>
  <Form class="p-4">
    <!-- prettier-ignore -->
    <div class="grid grid-rows-3 sm:grid-rows-2 grid-cols-2 sm:grid-cols-3 gap-4">
      <Metric class="order-1 sm:order-1" text="Power" :value="trainer?.power" />
      <Metric class="order-5 sm:order-2" text="Interval time" :value="formatSeconds(currentIntervalSeconds)" />
      <Metric class="order-2 sm:order-3" text="Heart rate" :value="hrm?.heartRate" />
      <Metric class="order-3 sm:order-4" text="Target power" :value="targetPower" />
      <Metric class="order-6 sm:order-5" text="Total time" :value="formatSeconds(elapsedSeconds)" />
      <Metric class="order-4 sm:order-6" text="Cadence" :value="trainer?.cadence" />
    </div>

    <div class="relative">
      <Chart class="aspect-5/2 shrink-0 border">
        <ChartLines />
        <ChartIntervals class="pointer-events-none" :intervals="workout.intervals" />
        <ChartProgress :x="elapsedSeconds" :max-x="workoutSeconds" v-slot="{ x }">
          <ChartLines :x="[0, x]" />
          <ChartHeartRate :polylines="activity.records.polylinesHeartRate(workoutSeconds)" />
          <ChartPower
            :polylines="activity.records.polylinesPower(2 * athlete.ftp, workoutSeconds)"
          />
        </ChartProgress>
      </Chart>

      <div
        v-if="currentInterval?.description"
        class="absolute top-0 flex h-1/4 items-center px-2 py-0.5"
        style="container-type: size"
        :style="
          progress <= 0.5
            ? { left: 100 * progress + '%', right: 0 }
            : { left: 0, right: 100 * (1 - progress) + '%' }
        "
      >
        <p
          class="w-full truncate font-bold"
          :class="{ 'text-right': progress > 0.5 }"
          style="font-size: min(var(--text-4xl), 100cqh)"
        >
          {{ currentInterval.description }}
        </p>
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
import { Activity } from '@/modules/activity';
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

const { activity: storeActivity } = storeToRefs(useActivityStore());
const activities = useActivitiesStore();
const { athlete } = storeToRefs(useAthleteStore());
const { hrm, trainer } = storeToRefs(useDevicesStore());

const activity = computed({
  get: () => storeActivity.value ?? new Activity(),
  set: (value) => {
    storeActivity.value = value;
  },
});

const elapsedSeconds = computed(() => {
  return activity.value.seconds;
});

const workout = computed(() => {
  return activity.value.workout;
});

const workoutSeconds = computed(() => {
  return workout.value.seconds;
});

const progress = computed(() => {
  return elapsedSeconds.value / workoutSeconds.value;
});

const currentIntervalData = computed(() => {
  let totalSeconds = 0;
  for (const [index, interval] of workout.value.intervals.entries()) {
    totalSeconds += interval.seconds;
    if (elapsedSeconds.value < totalSeconds) {
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
  return currentIntervalData.value != null
    ? currentIntervalData.value.totalSeconds - elapsedSeconds.value
    : 0;
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
  return currentInterval.value != null
    ? Math.round(athlete.value.ftp * currentInterval.value.intensity)
    : 0;
});

const setTargetPower = () => {
  trainer.value?.setTargetPower(targetPower.value);
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
  stopInterval.value = interval(1000, update);
};

const update = () => {
  activity.value.records.push(
    new Record(trainer.value.power, hrm.value?.heartRate ?? null, trainer.value.cadence),
  );
  if (activity.value.isFinished) {
    finish();
  }
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

  const index = activities.add(activity.value);

  activity.value = null;

  router.replace(`/activities/${index}`);
};
</script>
