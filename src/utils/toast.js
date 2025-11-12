import '@/utils/toast.css';
import { merge } from 'lodash-es';
import { Notyf } from 'notyf';

const notyf = new Notyf({
  ripple: false,
  types: [
    {
      type: 'info',
      background: 'var(--color-brand-3)',
      icon: false,
    },
    {
      type: 'success',
      background: 'var(--color-green)',
      icon: false,
    },
    {
      type: 'warning',
      background: 'var(--color-yellow)',
      icon: false,
    },
    {
      type: 'error',
      background: 'var(--color-red)',
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
      dismissOnClick: true,
    },
    options,
  );

  const notification = notyf.open({ message, ...options });
  if (options.dismissOnClick) {
    notification.on('click', () => notyf.dismiss(notification));
  }
  return notification;
}
