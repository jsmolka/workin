<template>
  <div class="flex flex-col justify-center items-center gap-2">
    <span class="text-shade-3 text-xs font-medium uppercase">{{ text }}</span>
    <span class="text-4xl font-bold" :class="value != null ? 'text-shade-1' : 'text-shade-3'">
      {{ metric }}
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

const metric = computed(() => {
  if (props.value == null) {
    return '-';
  }
  if (typeof props.value === 'number') {
    return Math.round(props.value);
  }
  return props.value;
});
</script>
