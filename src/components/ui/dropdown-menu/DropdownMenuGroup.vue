<template>
  <DropdownMenuGroup v-bind="props">
    <slot />
  </DropdownMenuGroup>
</template>

<script setup>
import { DropdownMenuGroup } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
