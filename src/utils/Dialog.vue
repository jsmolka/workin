<template>
  <Dialog
    :open="open"
    @update:open="
      open = $event;
      if (!$event) {
        emit('close', null);
      }
    "
  >
    <DialogContent>
      <DialogHeader v-show="title || description">
        <DialogTitle v-show="title">{{ title }}</DialogTitle>
        <DialogDescription v-show="description">{{ description }}</DialogDescription>
      </DialogHeader>
      <p class="max-w-max" v-html="content" />
      <DialogFooter v-if="buttons.length > 0">
        <Button
          v-for="(button, index) in buttons"
          v-bind="button"
          @click="
            open = false;
            emit('close', index);
          "
        >
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
import { ref } from 'vue';

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  buttons: { type: Array, default: [] },
});

const emit = defineEmits(['close']);
const open = ref(true);
</script>
