import Dialog from '@/utils/Dialog.vue';
import _ from 'lodash';
import { createApp } from 'vue';

function mount(props) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const app = createApp(Dialog, props);

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
  options = _.merge(
    {
      title: '',
      description: '',
      content: '',
      buttons: [],
    },
    options,
  );

  const { dialog, unmount } = mount(options);
  try {
    return await dialog.open();
  } finally {
    unmount();
  }
}
