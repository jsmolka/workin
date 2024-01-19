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
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
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
