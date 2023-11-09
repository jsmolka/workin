<template>
  <div class="preserve" :data-preserve="text">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.preserve::after {
  content: attr(data-preserve);
  @apply block;
  @apply h-0;
  @apply overflow-hidden;
  @apply invisible;
}
</style>
