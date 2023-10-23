<template>
  <div class="flex flex-col">
    <slot />
    <nav class="flex justify-between bg-gray-6">
      <RouterLink v-for="page in pages" :to="page.path" class="router-link">
        {{ page.text }}
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  pages: {
    type: Array,
    required: true,
    validator(pages) {
      return (
        pages.length > 0 &&
        pages.every((page) => typeof page.text === 'string' && typeof page.path === 'string')
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.router-link {
  @apply flex-1;
  @apply p-2;
  @apply text-center;
  @apply border-y-4;
  @apply border-transparent;

  &:hover {
    @apply bg-gray-5;
  }

  &:active {
    @apply bg-gray-4;
  }
}

.router-link-active {
  @apply bg-gray-4;
  @apply border-t-blue-3;
}
</style>
