<template>
  <Dialog :open="data.open" @close="close">
    <div class="fixed inset-0 flex justify-center items-center p-4 bg-black/50">
      <DialogPanel class="max-w-screen-sm p-4 bg-gray-6 rounded-sm shadow z-50">
        <Form>
          {{ data.text }}
          <div class="flex justify-end gap-4">
            <Button
              class="min-w-[4rem]"
              v-for="button in data.buttons"
              v-bind="button"
              @click="close(button.value)"
            />
          </div>
        </Form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue';
import { reactive } from 'vue';
import Button from './Button.vue';
import Form from './Form.vue';

const data = reactive({
  text: '',
  buttons: [],
  resolve: null,
  open: false,
});

const show = async (text, buttons) => {
  return new Promise((resolve) => {
    data.text = text;
    data.buttons = buttons;
    data.resolve = resolve;
    data.open = true;
  });
};

const close = (value = null) => {
  data.open = false;
  data.resolve(value);
};

defineExpose({ show });
</script>
