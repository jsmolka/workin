<template>
  <Menu as="div" class="relative h-5">
    <MenuButton>
      <EllipsisVerticalIcon class="w-5 h-5" />
    </MenuButton>
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <MenuItems class="v-dots-items absolute right-0 mt-2 p-1 bg-shade-6 rounded-sm shadow z-50">
        <slot />
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';
</script>

<style lang="scss">
.v-dots-items > * {
  @apply w-full;
  @apply text-left;
  @apply whitespace-nowrap;
}
</style>
