<template>
  <button class="button" :class="[classes, { disabled }]" :type="type">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const { blue } = defineProps({
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

const classes = computed(() =>
  blue
    ? 'bg-blue-3 hover:bg-blue-2 active:bg-blue-1'
    : 'bg-gray-6 hover:bg-gray-5 active:bg-gray-4',
);
</script>

<style lang="scss" scoped>
.button {
  @apply px-2;
  @apply py-1;
  @apply rounded-sm;

  &:focus {
    @apply outline-none;
  }
}
</style>
