<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>

<script setup>
import { DialogClose } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
