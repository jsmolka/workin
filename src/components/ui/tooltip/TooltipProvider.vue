<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>

<script setup>
import { TooltipProvider } from 'radix-vue';

const props = defineProps({
  delayDuration: { type: Number, required: false },
  disableClosingTrigger: { type: Boolean, required: false },
  disableHoverableContent: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  ignoreNonKeyboardFocus: { type: Boolean, required: false },
  skipDelayDuration: { type: Number, required: false },
});
</script>
