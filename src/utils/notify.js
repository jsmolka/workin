import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

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

export default function notify(message) {
  return notyf.open({ type: 'info', message });
}
