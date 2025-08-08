<template>
  <DropdownMenuSub v-bind="forwardedProps">
    <slot />
  </DropdownMenuSub>
</template>

<script setup>
import { DropdownMenuSub, useForwardPropsEmits } from 'reka-ui';

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
});

const emit = defineEmits(['update:open']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
