import Dialog from '@/utils/Dialog.vue';
import { createApp } from 'vue';

export async function dialog(props) {
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
