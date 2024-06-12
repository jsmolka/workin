<template>
  <DialogDescription v-bind="forwardedProps">
    <slot />
  </DialogDescription>
</template>

<script setup>
import { DialogDescription, useForwardProps } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});

const forwardedProps = useForwardProps(props);
</script>
