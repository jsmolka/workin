<template>
  <div class="grid place-items-center gap-2">
    <span class="text-gray-3 text-xs font-medium uppercase">{{ text }}</span>
    <span class="text-4xl font-bold" :class="value != null ? 'text-gray-1' : 'text-gray-3'">
      {{ valueText }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  value: {
    default: null,
  },
});

const valueText = computed(() => {
  const value = props.value;
  if (value == null) {
    return '-';
  }
  if (typeof value === 'number') {
    return Math.round(value);
  }
  return value;
});
</script>
