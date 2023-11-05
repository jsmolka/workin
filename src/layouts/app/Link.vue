<template>
  <RouterLink class="link" :to="{ name }">
    <slot :name="name">
      <span class="capitalize">{{ name }}</span>
    </slot>
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
  @apply text-center;
  @apply font-medium;
  @apply select-none;

  &:hover {
    @apply bg-gray-5;
  }

  &:active {
    @apply bg-gray-4;
  }
}

.router-link-active,
.router-link-active-exact {
  @apply bg-gray-4;
  @apply border-t-blue-3;
}
</style>
