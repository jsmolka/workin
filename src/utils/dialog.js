import { createApp } from 'vue';
import Dialog from '../components/Dialog.vue';

const div = document.createElement('div');
document.body.appendChild(div);

const dialog = createApp(Dialog).mount(div);

export async function show(text, buttons) {
  return dialog.show(text, buttons);
}
