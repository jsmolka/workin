<template>
  <div class="reserve" :data-reserve="reserve">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  reserve: { type: String, required: true },
});
</script>

<style scoped>
@reference "@/main.css";

.reserve::after {
  @apply block;
  @apply h-0;
  @apply overflow-hidden;
  @apply invisible;

  content: attr(data-reserve);
}
</style>
