import Dialog from '@/utils/Dialog.vue';
import { createApp, h } from 'vue';

export async function dialog(props) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  return new Promise((resolve) => {
    const app = createApp(
      h(Dialog, {
        onClose: (value) => {
          try {
            resolve(value);
          } finally {
            setTimeout(() => {
              app.unmount();
              div.remove();
            }, 150);
          }
        },
      }),
      props,
    );
    app.mount(div);
  });
}
