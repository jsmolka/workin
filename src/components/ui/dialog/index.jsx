export { default as Dialog } from './Dialog.vue';
export { default as DialogClose } from './DialogClose.vue';
export { default as DialogContent } from './DialogContent.vue';
export { default as DialogDescription } from './DialogDescription.vue';
export { default as DialogFooter } from './DialogFooter.vue';
export { default as DialogHeader } from './DialogHeader.vue';
export { default as DialogProgrammatic } from './DialogProgrammatic.vue';
export { default as DialogTitle } from './DialogTitle.vue';
export { default as DialogTrigger } from './DialogTrigger.vue';

import DialogProgrammaticDefault from '@/components/ui/dialog/DialogProgrammaticDefault.vue';
import { createApp } from 'vue';

export async function dialog(props, Dialog = DialogProgrammaticDefault) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  return new Promise((resolve) => {
    const app = createApp(
      <Dialog
        {...props}
        onClose={(value) => {
          try {
            resolve(value);
          } finally {
            setTimeout(() => {
              app.unmount();
            }, 150);
          }
        }}
      />,
    );
    app.mount(div);
    app.onUnmount(() => {
      div.remove();
    });
  });
}
