import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './notify.scss';
import { stringify } from './stringify';

const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'bottom',
  },
  duration: null,
  dismissible: true,
  ripple: false,
  types: [
    {
      type: 'info',
      background: '#5e81ac',
      icon: false,
    },
    {
      type: 'warn',
      background: '#ebcb8b',
      icon: false,
    },
    {
      type: 'error',
      background: '#bf616a',
      icon: false,
    },
  ],
});

function define(type) {
  return (...args) => {
    return notyf.open({ type, message: args.map(stringify).join(' ') });
  };
}

export const info = define('info');
export const warn = define('warn');
export const error = define('error');

export const notify = {
  info,
  warn,
  error,
};
