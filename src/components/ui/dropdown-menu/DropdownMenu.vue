<template>
  <DropdownMenuRoot v-bind="forwardedProps">
    <slot />
  </DropdownMenuRoot>
</template>

<script setup>
import { DropdownMenuRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  dir: { type: String, required: false },
  modal: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
});

const emit = defineEmits(['update:open']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
