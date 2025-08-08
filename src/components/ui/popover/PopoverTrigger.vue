<template>
  <PopoverTrigger v-bind="props">
    <slot />
  </PopoverTrigger>
</template>

<script setup>
import { PopoverTrigger } from 'reka-ui';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
