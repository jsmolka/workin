<template>
  <Dialog :open="state.open" @update:open="close(null)">
    <DialogContent>
      <DialogHeader v-show="state.title || state.description">
        <DialogTitle v-show="state.title">{{ state.title }}</DialogTitle>
        <DialogDescription v-show="state.description">{{ state.description }}</DialogDescription>
      </DialogHeader>
      <p class="max-w-max">{{ state.content }}</p>
      <DialogFooter v-if="state.buttons.length > 0">
        <Button v-for="(button, index) in state.buttons" @click="close(index)" v-bind="button">
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
import _ from 'lodash';
import { reactive } from 'vue';

const state = reactive({
  title: '',
  description: '',
  content: '',
  buttons: [],
  resolve: () => {},
  open: false,
});

const open = async (options) => {
  options = _.merge(
    {
      title: '',
      description: '',
      content: '',
      buttons: [],
    },
    options,
  );

  state.title = options.title;
  state.description = options.description;
  state.content = options.content;
  state.buttons = options.buttons;

  return new Promise((resolve) => {
    state.resolve = resolve;
    state.open = true;
  });
};

const close = (value) => {
  state.open = false;
  state.resolve(value);
};

defineExpose({ open });
</script>
