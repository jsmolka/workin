<template>
  <Dialog :open="open" @close="hide">
    <div class="fixed inset-0 flex justify-center items-center p-4 bg-black/50">
      <DialogPanel class="max-w-screen-sm p-4 bg-gray-7 rounded-sm shadow z-50">
        <slot :hide="hide" />
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue';
import { ref } from 'vue';

const open = ref(false);

const show = () => (open.value = true);
const hide = () => (open.value = false);

defineExpose({ show, hide });
</script>
