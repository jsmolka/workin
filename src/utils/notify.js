import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './notify.scss';
import { stringify } from './stringify';

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
      background: '#5e81ac',
      icon: false,
    },
    {
      type: 'warn',
      duration: null,
      dismissible: true,
      background: '#ebcb8b',
      icon: false,
    },
    {
      type: 'error',
      duration: null,
      dismissible: true,
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
