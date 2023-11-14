<template>
  <div class="flex flex-col h-full">
    <div class="container relative flex-1">
      <div class="absolute inset-0 p-4 bg-gray-7 overflow-y-auto">
        <RouterView />
      </div>
    </div>
    <div class="bg-gray-6 border-t border-gray-4">
      <nav class="container flex justify-between">
        <RouterLink
          v-for="name in ['train', 'workouts', 'activities', 'settings']"
          :to="{ name }"
          class="tab flex-1 capitalize"
        >
          {{ name }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}

.router-link-active,
.router-link-active-exact {
  @apply bg-gray-4;
  @apply border-t-blue-3;
}
</style>
