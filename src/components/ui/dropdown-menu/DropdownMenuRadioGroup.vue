<template>
  <DropdownMenuRadioGroup v-bind="forwarded">
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

const emits = defineEmits(['update:modelValue']);

const forwarded = useForwardPropsEmits(props, emits);
</script>
