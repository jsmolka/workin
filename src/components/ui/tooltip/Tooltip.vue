<template>
  <TooltipRoot v-bind="forwardedProps">
    <slot />
  </TooltipRoot>
</template>

<script setup>
import { TooltipRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  delayDuration: { type: Number, required: false },
  disableClosingTrigger: { type: Boolean, required: false },
  disableHoverableContent: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  ignoreNonKeyboardFocus: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
});

const emit = defineEmits(['update:open']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
