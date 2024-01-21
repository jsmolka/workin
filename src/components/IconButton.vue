<template>
  <button
    :class="[
      brand
        ? 'bg-brand-3 hover:bg-brand-2 active:bg-brand-1 text-shade-8'
        : 'bg-shade-6 hover:bg-shade-5 active:bg-shade-4 text-shade-2',
      { disabled },
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  brand: {
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
  @apply p-2;
  @apply rounded-full;
  @apply cursor-pointer;
  @apply select-none;

  &:focus {
    @apply outline-none;
  }
}
</style>
