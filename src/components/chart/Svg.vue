<template>
  <svg class="cartesian" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    <slot />
  </svg>
</template>

<style lang="scss" scoped>
.cartesian {
  transform-origin: 50% 50%;
  transform: scale(1, -1);
}
</style>
