<template>
  <DropdownMenuTrigger v-bind="forwardedProps">
    <slot />
  </DropdownMenuTrigger>
</template>

<script setup>
import { DropdownMenuTrigger, useForwardProps } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
});

const forwardedProps = useForwardProps(props);
</script>
