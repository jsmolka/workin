<template>
  <SelectItemText v-bind="props">
    <slot />
  </SelectItemText>
</template>

<script setup>
import { SelectItemText } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
});
</script>
