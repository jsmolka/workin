import { Notyf } from 'notyf';
import './notify.scss';
import { stringify } from './stringify';

const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'bottom',
  },
  duration: 10000,
  ripple: false,
  types: [
    {
      type: 'info',
      background: 'var(--brand-3)',
      icon: false,
    },
  ],
});

export function notify(...args) {
  const notification = notyf.open({
    type: 'info',
    message: args.map(stringify).join(' '),
  });
  notification.on('click', () => {
    notyf.dismiss(notification);
  });
  return notification;
}
