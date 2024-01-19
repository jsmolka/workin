import { createApp } from 'vue';
import Dialog from '../components/Dialog.vue';

const div = document.createElement('div');
document.body.appendChild(div);

const component = createApp(Dialog).mount(div);

export async function dialog(content, buttons) {
  return component.show(content, buttons);
}
