<template>
  <svg
    class="cartesian bg-shade-8 rounded-sm overflow-hidden"
    viewBox="0 0 100 100"
    shape-rendering="geometricPrecision"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>

<style lang="scss" scoped>
.cartesian {
  transform-origin: 50% 50%;
  transform: scale(1, -1);
}
</style>
