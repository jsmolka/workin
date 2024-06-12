<template>
  <TabsRoot v-bind="forwardedProps">
    <slot />
  </TabsRoot>
</template>

<script setup>
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  activationMode: { type: String, required: false },
  as: { required: false },
  asChild: { type: Boolean, required: false },
  defaultValue: { required: false },
  dir: { type: String, required: false },
  modelValue: { required: false },
  orientation: { type: String, required: false },
});

const emit = defineEmits(['update:modelValue']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
