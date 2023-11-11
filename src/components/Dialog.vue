<template>
  <Dialog :open="open" @close="close">
    <div class="fixed inset-0 flex justify-center items-center p-4 bg-black/50">
      <DialogPanel class="max-w-screen-sm p-4 bg-gray-7 rounded-sm">
        <slot :close="close" />
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue';

const open = defineModel('open', {
  type: Boolean,
  required: true,
});

const close = () => {
  open.value = false;
};
</script>
