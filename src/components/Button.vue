<template>
  <button class="button" :class="[classNames, { disabled }]" :type="type">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  blue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
});

const classNames = computed(() => {
  return props.blue ? 'bg-blue-3 hover:bg-blue-2 active:bg-blue-1' : 'bg-gray-6 hover:bg-gray-5 active:bg-gray-4';
});
</script>

<style scoped>
.button {
  @apply px-1.5;
  @apply py-1;
  @apply rounded-sm;
  @apply focus:outline-none;
}
</style>
