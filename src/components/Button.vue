<template>
  <button class="button" :class="{ disabled, 'bg-gray-3': !brand, 'bg-blue': brand }">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.button {
  @apply px-1.5;
  @apply py-1;
  @apply rounded;
  @apply focus:outline-none;
  @apply hover:brightness-110;
}
</style>
