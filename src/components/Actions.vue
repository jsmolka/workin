<template>
  <Menu as="div" class="relative">
    <MenuButton>
      <EllipsisVerticalIcon class="w-5 h-5 cursor-pointer" />
    </MenuButton>
    <MenuItems class="absolute right-0 mt-2 bg-gray-6 origin-top-right rounded-sm">
      <div class="p-1">
        <MenuItem>
          <Button @click="emit('delete')">Delete</Button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';
import Button from './Button.vue';

const emit = defineEmits(['delete']);
</script>
