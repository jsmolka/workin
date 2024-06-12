<template>
  <SelectRoot v-bind="forwardedProps">
    <slot />
  </SelectRoot>
</template>

<script setup>
import { SelectRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  autocomplete: { type: String, required: false },
  defaultOpen: { type: Boolean, required: false },
  defaultValue: { type: String, required: false },
  dir: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  modelValue: { type: String, required: false },
  name: { type: String, required: false },
  open: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
});

const emit = defineEmits(['update:modelValue', 'update:open']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
