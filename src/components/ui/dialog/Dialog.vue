<template>
  <DialogRoot v-model:open="open" v-bind="forwarded">
    <slot :close="close" />
  </DialogRoot>
</template>

<script setup>
import { DialogRoot, useForwardProps } from 'radix-vue';

const open = defineModel('open', { type: Boolean, required: false });

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false },
});

const forwarded = useForwardProps(props);

const close = () => {
  open.value = false;
};
</script>
