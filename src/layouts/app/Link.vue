<template>
  <RouterLink class="link" :to="{ name }">
    <slot />
  </RouterLink>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.link {
  @apply p-2;
  @apply border-y-4;
  @apply border-transparent;
  @apply font-medium;
  @apply text-center;

  &:hover {
    @apply bg-gray-5;
  }

  &:active {
    @apply bg-gray-4;
  }
}

.active {
  @apply bg-gray-4;
  @apply border-t-blue-3;
}
</style>
