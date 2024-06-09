<template>
  <div class="flex flex-col h-full">
    <div class="container relative flex-1">
      <div class="absolute inset-0 overflow-y-auto">
        <RouterView class="p-4" />
      </div>
    </div>
    <div class="z-10 bg-shade-7 border-t">
      <nav class="container grid grid-flow-col auto-cols-fr">
        <RouterLink class="tab" to="/train">Train</RouterLink>
        <RouterLink class="tab" to="/workouts">Workouts</RouterLink>
        <RouterLink class="tab" to="/activities">Activities</RouterLink>
        <RouterLink class="tab" to="/settings">Settings</RouterLink>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @apply max-w-screen-sm;
  @apply mx-auto;
}

.tab {
  @apply p-2;
  @apply bg-shade-7;
  @apply text-center;
  @apply border-y-4;
  @apply border-transparent;
  @apply cursor-pointer;
  @apply select-none;
  @apply transition-colors;

  &:hover {
    @apply bg-shade-6;
  }
}

.router-link-active {
  @apply border-t-brand-3;

  background-color: rgb(var(--shade-5)) !important;
}
</style>
