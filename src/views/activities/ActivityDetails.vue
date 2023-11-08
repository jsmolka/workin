<template>
  <ResponsiveFlex class="gap-4">
    <div class="flex flex-col">
      <span>{{ formatSeconds(activity.seconds) }}</span>
      <span class="label">Duration</span>
    </div>
    <div class="flex flex-col">
      <span>{{ formatNumber(activity.averagePower) }}</span>
      <span class="label">Avg W</span>
    </div>
    <div class="flex flex-col">
      <span>{{ formatNumber(activity.averageHeartRate) }}</span>
      <span class="label">Avg BPM</span>
    </div>
    <div class="flex flex-col">
      <span>{{ formatNumber(activity.averageCadence) }}</span>
      <span class="label">Avg RPM</span>
    </div>
    <div class="flex flex-col">
      <span>{{ formatNumber(activity.calories) }}</span>
      <span class="label">Calories</span>
    </div>
  </ResponsiveFlex>
</template>

<script setup>
import ResponsiveFlex from '../../components/ResponsiveFlex.vue';
import { useFormat } from '../../composables/useFormat';
import { Activity } from '../../modules/activity';

const props = defineProps({
  activity: {
    type: Activity,
    required: true,
  },
});

const { formatSeconds, formatNumber } = useFormat();
</script>

<style lang="scss" scoped>
.label {
  @apply text-gray-3;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply whitespace-nowrap;
}
</style>
