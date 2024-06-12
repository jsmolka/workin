<template>
  <DropdownMenuRadioGroup v-bind="forwardedProps">
    <slot />
  </DropdownMenuRadioGroup>
</template>

<script setup>
import { DropdownMenuRadioGroup, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  modelValue: { type: String, required: false },
});

const emit = defineEmits(['update:modelValue']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
