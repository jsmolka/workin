<template>
  <TabsRoot v-bind="forwarded">
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

const emits = defineEmits(['update:modelValue']);

const forwarded = useForwardPropsEmits(props, emits);
</script>
