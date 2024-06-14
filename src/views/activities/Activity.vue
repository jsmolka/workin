<template>
  <div
    :class="
      cn('flex gap-4 p-4 bg-shade-7 border rounded-sm select-none hover:bg-shade-6', props.class)
    "
  >
    <Chart class="shrink-0 h-24 aspect-[3/2] sm:aspect-[5/2]">
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
import Chart from '@/components/chart/Chart.vue';
import ChartHeartRate from '@/components/chart/ChartHeartRate.vue';
import ChartLines from '@/components/chart/ChartLines.vue';
import ChartPower from '@/components/chart/ChartPower.vue';
import { Activity } from '@/modules/activity';
import { cn } from '@/utils/ui';
import Header from '@/views/activities/Header.vue';

const props = defineProps({
  activity: { type: Activity, required: true },
  class: { required: false },
});
</script>
