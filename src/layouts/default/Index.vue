<template>
  <div class="flex h-full flex-col">
    <div class="relative container flex-1">
      <div class="absolute inset-0 overflow-y-auto">
        <RouterView class="h-full" />
      </div>
    </div>
    <div class="bg-shade-7 z-10 border-t">
      <nav class="container grid auto-cols-fr grid-flow-col">
        <RouterLink
          v-for="{ text, route } in [
            { text: 'Train', route: '/train' },
            { text: 'Workouts', route: '/workouts' },
            { text: 'Activities', route: '/activities' },
            { text: 'Settings', route: '/settings' },
          ]"
          class="bg-shade-7 hover:bg-shade-6 focus-visible:bg-shade-6 router-link-active:bg-shade-5 router-link-active:border-t-brand-3 cursor-pointer border-y-4 border-transparent p-2 text-center select-none focus-visible:ring-0"
          :to="route"
        >
          {{ text }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
@reference "@/main.css";

.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}
</style>
