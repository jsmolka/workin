<template>
  <div class="flex flex-col">
    <span class="truncate text-lg text-shade-1 font-bold">
      {{ formatDate(activity.date, 'HH:mm') }}
    </span>
    <span class="truncate">
      {{ formatDate(activity.date, 'MMMM D, YYYY') }}
    </span>
  </div>
  <Stats>
    <Stat>
      {{ formatSeconds(activity.seconds) }}
      <StatLabel>Duration</StatLabel>
    </Stat>
    <Stat>
      {{ Math.round(activity.averagePower) }}
      <StatLabel>Avg W</StatLabel>
    </Stat>
    <Stat v-if="activity.averageHeartRate != null">
      {{ Math.round(activity.averageHeartRate) }}
      <StatLabel>Avg bpm</StatLabel>
    </Stat>
    <Stat v-if="activity.averageCadence != null">
      {{ Math.round(activity.averageCadence) }}
      <StatLabel>Avg rpm</StatLabel>
    </Stat>
    <Stat>
      {{ Math.round(activity.calories) }}
      <StatLabel>Calories</StatLabel>
    </Stat>
  </Stats>
</template>

<script setup>
import { Stat, StatLabel, Stats } from '@/components/stats';
import { Activity } from '@/modules/activity';
import { formatDate, formatSeconds } from '@/utils/time';

defineProps({
  activity: { type: Activity, required: true },
});
</script>
