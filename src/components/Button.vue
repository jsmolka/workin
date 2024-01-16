<template>
  <button
    :class="[
      blue
        ? 'text-gray-8 bg-blue-3 hover:bg-blue-2 active:bg-blue-1'
        : 'text-gray-2 bg-gray-6 hover:bg-gray-5 active:bg-gray-4',
      { disabled },
    ]"
    v-bind="$attrs"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  blue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
button {
  @apply px-2;
  @apply py-1.5;
  @apply rounded-sm;
  @apply cursor-pointer;
  @apply select-none;

  &:focus {
    @apply outline-none;
  }
}
</style>
