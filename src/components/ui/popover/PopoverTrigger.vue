<template>
  <PopoverTrigger v-bind="props">
    <slot />
  </PopoverTrigger>
</template>

<script setup>
import { PopoverTrigger } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
