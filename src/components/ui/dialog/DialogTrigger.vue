<template>
  <DialogTrigger v-bind="props">
    <slot />
  </DialogTrigger>
</template>

<script setup>
import { DialogTrigger } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
