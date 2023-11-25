<template>
  <div class="flex flex-col">
    <span class="truncate text-gray-1 text-lg font-bold">
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
      {{ Math.round(averagePower) }}
    </Attribute>
    <Attribute v-if="averageHeartRate != null" text="Avg bpm">
      {{ Math.round(averageHeartRate) }}
    </Attribute>
    <Attribute v-if="averageCadence != null" text="Avg rpm">
      {{ Math.round(averageCadence) }}
    </Attribute>
    <Attribute text="Calories">
      {{ Math.round(activity.calories) }}
    </Attribute>
  </FlexWrapHidden>
</template>

<script setup>
import { computed } from 'vue';
import Attribute from '../../components/Attribute.vue';
import FlexWrapHidden from '../../components/FlexWrapHidden.vue';
import { Activity } from '../../modules/activity';
import { formatDate, formatSeconds } from '../../utils/time';

const props = defineProps({
  activity: {
    type: Activity,
    required: true,
  },
});

const averagePower = computed(() => props.activity.averagePower);
const averageHeartRate = computed(() => props.activity.averageHeartRate);
const averageCadence = computed(() => props.activity.averageCadence);
</script>
