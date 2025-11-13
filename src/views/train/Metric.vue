<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <span class="text-shade-3 text-xs font-medium uppercase">{{ text }}</span>
    <span
      class="font-feature-tnum text-4xl font-bold"
      :class="value != null ? 'text-shade-1' : 'text-shade-3'"
    >
      {{ metric }}
    </span>
  </div>
</template>

<script setup>
import { isNumber } from 'lodash-es';
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  value: { type: [Number, String], required: false },
});

const metric = computed(() => {
  if (props.value == null) {
    return '-';
  }
  if (isNumber(props.value)) {
    return Math.round(props.value);
  }
  return props.value;
});
</script>
