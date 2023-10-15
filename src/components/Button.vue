<template>
  <button class="button" :class="{ disabled }">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.button {
  @apply px-1.5;
  @apply py-1;
  @apply bg-night-3;
  @apply rounded;
  @apply focus:outline-none;
  @apply focus:ring-2;
  @apply focus:ring-frost-2;
}
</style>
