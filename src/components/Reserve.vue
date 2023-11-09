<template>
  <div class="reserve" :data-reserve="reserve">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  reserve: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.reserve::after {
  content: attr(data-reserve);
  @apply block;
  @apply h-0;
  @apply overflow-hidden;
  @apply invisible;
}
</style>
