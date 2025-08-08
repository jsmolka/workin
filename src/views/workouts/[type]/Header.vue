<template>
  <div class="flex flex-col">
    <span class="text-shade-1 truncate text-lg font-bold">{{ workout.name }}</span>
    <span class="truncate">{{ workout.zone.name }}</span>
  </div>
  <Stats>
    <Stat>
      {{ formatSeconds(workout.seconds) }}
      <StatLabel>Duration</StatLabel>
    </Stat>
    <Stat>
      {{ Math.round(athlete.ftp * workout.averageIntensity) }}
      <StatLabel>Avg W</StatLabel>
    </Stat>
    <Stat>
      {{ Math.round(athlete.ftp * workout.maxIntensity) }}
      <StatLabel>Max W</StatLabel>
    </Stat>
    <Stat>
      {{ Math.round(workout.calories(athlete.ftp)) }}
      <StatLabel>Calories</StatLabel>
    </Stat>
  </Stats>
</template>

<script setup>
import { Stat, StatLabel, Stats } from '@/components/stats';
import { Workout } from '@/modules/workout';
import { useAthleteStore } from '@/stores/athlete';
import { formatSeconds } from '@/utils/time';
import { storeToRefs } from 'pinia';

defineProps({
  workout: { type: Workout, required: true },
});

const { athlete } = storeToRefs(useAthleteStore());
</script>
