<template>
  <button
    :class="[
      blue
        ? 'bg-blue-3 hover:bg-blue-2 active:bg-blue-1'
        : 'bg-gray-6 hover:bg-gray-5 active:bg-gray-4',
      { disabled },
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  blue: {
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
  @apply select-none;

  &:focus {
    @apply outline-none;
  }
}
</style>
