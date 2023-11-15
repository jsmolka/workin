<template>
  <Menu as="div" class="relative h-5">
    <MenuButton>
      <EllipsisVerticalIcon class="w-5 h-5" />
    </MenuButton>
    <MenuItems class="dots-items absolute right-0 mt-2 p-1 bg-gray-6 rounded-sm">
      <slot />
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';
</script>

<style lang="scss">
.dots-items > * {
  @apply w-full;
  @apply text-left;
  @apply whitespace-nowrap;
}
</style>
