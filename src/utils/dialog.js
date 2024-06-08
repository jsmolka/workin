import Dialog from '@/utils/Dialog.vue';
import { createApp } from 'vue';

function mount() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const app = createApp(Dialog);

  return {
    dialog: app.mount(div),
    unmount() {
      setTimeout(() => {
        app.unmount();
        div.remove();
      }, 150);
    },
  };
}

export async function dialog(options) {
  const { dialog, unmount } = mount();
  try {
    return await dialog.open(options);
  } finally {
    unmount();
  }
}
