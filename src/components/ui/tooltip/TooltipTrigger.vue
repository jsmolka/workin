<template>
  <TooltipTrigger v-bind="props">
    <slot />
  </TooltipTrigger>
</template>

<script setup>
import { TooltipTrigger } from 'reka-ui';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
