import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './notify.scss';
import { stringify } from './stringify';

class Notify extends Notyf {
  constructor() {
    super({
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
  }
}

for (const type of ['info', 'warn', 'error']) {
  Notify.prototype[type] = function (...args) {
    return this.open({ type, message: args.map(stringify).join(' ') });
  };
}

export const notify = new Notify();
