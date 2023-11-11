<template>
  <FlexWrapHidden class="gap-4">
    <Attribute text="Duration">
      {{ formatSeconds(activity.seconds) }}
    </Attribute>
    <Attribute text="Avg W">
      {{ Math.round(activity.averagePower) }}
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
import { useFormat } from '../../composables/useFormat';
import { Activity } from '../../modules/activity';

const props = defineProps({
  activity: {
    type: Activity,
    required: true,
  },
});

const { formatSeconds } = useFormat();

const averageHeartRate = computed(() => props.activity.averageHeartRate);
const averageCadence = computed(() => props.activity.averageCadence);
</script>
