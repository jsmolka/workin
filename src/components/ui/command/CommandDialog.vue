<template>
  <Dialog v-bind="forwardedProps">
    <DialogContent class="p-0">
      <DialogHeader v-show="false">
        <DialogTitle>Command</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Command>
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Command } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription, useForwardPropsEmits } from 'radix-vue';

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
});

const emit = defineEmits(['update:open']);

const forwardedProps = useForwardPropsEmits(props, emit);
</script>
