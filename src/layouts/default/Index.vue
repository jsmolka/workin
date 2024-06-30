<template>
  <div class="flex flex-col h-full">
    <div class="container relative flex-1">
      <div class="absolute inset-0 overflow-y-auto">
        <RouterView class="h-full" />
      </div>
    </div>
    <div class="z-10 bg-shade-7 border-t">
      <nav class="container grid grid-flow-col auto-cols-fr">
        <RouterLink
          v-for="{ text, route } in [
            { text: 'Train', route: '/train' },
            { text: 'Workouts', route: '/workouts' },
            { text: 'Activities', route: '/activities' },
            { text: 'Settings', route: '/settings' },
          ]"
          class="p-2 bg-shade-7 text-center border-y-4 border-transparent cursor-pointer select-none hover:bg-shade-6 focus-visible:bg-shade-6 focus-visible:ring-0 router-link-active:bg-shade-5 router-link-active:border-t-brand-3"
          :to="route"
        >
          {{ text }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}
</style>
