<template>
  <div
    :class="
      cn('bg-shade-7 hover:bg-shade-6 flex gap-4 rounded-xs border p-4 select-none', props.class)
    "
  >
    <Chart class="aspect-3/2 h-24 shrink-0 sm:aspect-5/2">
      <ChartLines />
      <ChartHeartRate :polylines="activity.polylinesHeartRate" />
      <ChartPower :polylines="activity.polylinesPower" />
    </Chart>
    <div class="flex flex-col justify-between overflow-hidden">
      <Header :activity="activity" />
    </div>
  </div>
</template>

<script setup>
import { Chart, ChartHeartRate, ChartLines, ChartPower } from '@/components/chart';
import { Activity } from '@/modules/activity';
import { cn } from '@/utils/ui';
import Header from '@/views/activities/Header.vue';

const props = defineProps({
  activity: { type: Activity, required: true },
  class: { required: false },
});
</script>
