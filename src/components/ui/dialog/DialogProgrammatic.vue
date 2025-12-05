<template>
  <Dialog :open="open" @update:open="close(null)">
    <DialogContent v-bind="$attrs">
      <DialogHeader v-show="title || description">
        <DialogTitle v-show="title">{{ title }}</DialogTitle>
        <DialogDescription v-show="description">{{ description }}</DialogDescription>
      </DialogHeader>
      <slot :close="close" />
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ref } from 'vue';

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
});

const emit = defineEmits(['close']);
const open = ref(true);

const close = (value) => {
  emit('close', value);
  open.value = false;
};

defineExpose({ close });
</script>
