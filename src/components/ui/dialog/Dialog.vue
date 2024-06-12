<template>
  <DialogRoot v-bind="forwardedProps">
    <slot />
  </DialogRoot>
</template>

<script setup>
import { DialogRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
});

const emit = defineEmits(['update:open']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
