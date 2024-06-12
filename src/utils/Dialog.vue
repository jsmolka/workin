<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader v-show="title || description">
        <DialogTitle v-show="title">{{ title }}</DialogTitle>
        <DialogDescription v-show="description">{{ description }}</DialogDescription>
      </DialogHeader>
      <p class="max-w-max" v-html="content" />
      <DialogFooter v-if="buttons.length > 0">
        <Button v-for="(button, index) in buttons" v-bind="button" @click="close(index)">
          {{ button.text }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { computed, ref } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  buttons: { type: Array, default: [] },
});

const resolve = ref(null);

const open = async () => {
  return new Promise(async (res) => {
    resolve.value = res;
  });
};

const close = (value) => {
  resolve.value(value);
  resolve.value = null;
};

const isOpen = computed({
  get: () => resolve.value != null,
  set: (open) => {
    if (!open) {
      close(null);
    }
  },
});

defineExpose({ open });
</script>
