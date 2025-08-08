<template>
  <SelectValue v-bind="props" class="[[data-placeholder]_&]:text-shade-3 select-none">
    <slot />
  </SelectValue>
</template>

<script setup>
import { SelectValue } from 'reka-ui';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  placeholder: { type: String, required: false },
});
</script>
