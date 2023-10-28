import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './notify.scss';

const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'bottom',
  },
  types: [
    {
      type: 'info',
      duration: null,
      dismissible: true,
      background: 'var(--blue-3)',
      icon: false,
    },
  ],
});

export function notify(message) {
  return notyf.open({ type: 'info', message });
}
