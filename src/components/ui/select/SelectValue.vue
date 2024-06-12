<template>
  <SelectValue v-bind="props" class="select-none [[data-placeholder]_&]:text-shade-3">
    <slot />
  </SelectValue>
</template>

<script setup>
import { SelectValue } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  placeholder: { type: String, required: false },
});
</script>
