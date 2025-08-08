<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>

<script setup>
import { DialogClose } from 'reka-ui';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
