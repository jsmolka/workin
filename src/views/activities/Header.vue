<template>
  <div class="flex flex-col">
    <span class="truncate text-shade-1 text-lg font-bold">
      {{ formatDate(activity.date, 'HH:mm') }}
    </span>
    <span class="truncate">
      {{ formatDate(activity.date, 'MMMM D, YYYY') }}
    </span>
  </div>
  <FlexWrapHidden class="gap-4">
    <Attribute text="Duration">
      {{ formatSeconds(activity.seconds) }}
    </Attribute>
    <Attribute text="Avg W">
      {{ Math.round(activity.averagePower) }}
    </Attribute>
    <Attribute v-if="activity.averageHeartRate != null" text="Avg bpm">
      {{ Math.round(activity.averageHeartRate) }}
    </Attribute>
    <Attribute v-if="activity.averageCadence != null" text="Avg rpm">
      {{ Math.round(activity.averageCadence) }}
    </Attribute>
    <Attribute text="Calories">
      {{ Math.round(activity.calories) }}
    </Attribute>
  </FlexWrapHidden>
</template>

<script setup>
import Attribute from '../../components/Attribute.vue';
import FlexWrapHidden from '../../components/FlexWrapHidden.vue';
import { Activity } from '../../modules/activity';
import { formatDate, formatSeconds } from '../../utils/time';

defineProps({
  activity: {
    type: Activity,
    required: true,
  },
});
</script>
