import '@/utils/toast.scss';
import { merge } from 'lodash-es';
import { Notyf } from 'notyf';

const notyf = new Notyf({
  ripple: false,
  types: [
    {
      type: 'info',
      background: 'rgb(var(--brand-3))',
      icon: false,
    },
    {
      type: 'success',
      background: 'rgb(var(--green))',
      icon: false,
    },
    {
      type: 'warning',
      background: 'rgb(var(--yellow))',
      icon: false,
    },
    {
      type: 'error',
      background: 'rgb(var(--red))',
      icon: false,
    },
  ],
});

export function toast(message, options = {}) {
  options = merge(
    {
      type: 'info',
      duration: 5000,
      position: {
        x: 'center',
        y: 'bottom',
      },
    },
    options,
  );

  const notification = notyf.open({ message, ...options });
  notification.on('click', () => notyf.dismiss(notification));
  return notification;
}
