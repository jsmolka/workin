<template>
  <div class="flex flex-col justify-center items-center gap-2">
    <span class="text-xs text-shade-3 font-medium uppercase">{{ text }}</span>
    <span class="text-4xl font-bold" :class="value != null ? 'text-shade-1' : 'text-shade-3'">
      {{ metric }}
    </span>
  </div>
</template>

<script setup>
import _ from 'lodash';
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  value: { type: [Number, String], required: false },
});

const metric = computed(() => {
  if (props.value == null) {
    return '-';
  }
  if (_.isNumber(props.value)) {
    return Math.round(props.value);
  }
  return props.value;
});
</script>
