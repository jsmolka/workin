<template>
  <div class="flex flex-col">
    <span class="truncate text-gray-1 text-lg font-bold">{{ workout.name }}</span>
    <span class="truncate">{{ workout.zone.name }}</span>
  </div>
  <FlexWrapHidden class="gap-4">
    <Attribute text="Duration">
      {{ formatSeconds(workout.seconds) }}
    </Attribute>
    <Attribute text="Avg W">
      {{ Math.round(workout.averageIntensity * athlete.ftp) }}
    </Attribute>
    <Attribute text="Max W">
      {{ Math.round(workout.maxIntensity * athlete.ftp) }}
    </Attribute>
    <Attribute text="Calories">
      {{ Math.round(workout.calories(athlete.ftp)) }}
    </Attribute>
  </FlexWrapHidden>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Attribute from '../../components/Attribute.vue';
import FlexWrapHidden from '../../components/FlexWrapHidden.vue';
import { useFormat } from '../../composables/useFormat';
import { Workout } from '../../modules/workout';
import { useAthleteStore } from '../../stores/athlete';

defineProps({
  workout: {
    type: Workout,
    required: true,
  },
});

const { athlete } = storeToRefs(useAthleteStore());
const { formatSeconds } = useFormat();
</script>
