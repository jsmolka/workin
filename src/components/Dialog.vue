<template>
  <TransitionRoot appear :show="state.visible" as="template">
    <Dialog @close="close">
      <TransitionChild
        as="template"
        enter="duration-150 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 z-[9998]" />
      </TransitionChild>

      <div class="fixed inset-0 flex justify-center items-center p-4 z-[9999]">
        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="max-w-screen-sm p-4 bg-shade-7 rounded-sm shadow z-20">
            <Form>
              <div v-html="state.content" />
              <div class="flex justify-end gap-4">
                <Button
                  v-for="button in state.buttons"
                  @click="close(button.value)"
                  v-bind="button"
                />
              </div>
            </Form>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { reactive } from 'vue';
import Button from './Button.vue';
import Form from './Form.vue';

const state = reactive({
  content: '',
  buttons: [],
  resolve: null,
  visible: false,
});

const show = async (content, buttons) =>
  new Promise((resolve) => {
    state.content = content;
    state.buttons = buttons;
    state.resolve = resolve;
    state.visible = true;
  });

const close = (value = null) => {
  state.visible = false;
  state.resolve(value);
};

defineExpose({ show });
</script>
