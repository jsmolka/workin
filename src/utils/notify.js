import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notify = new Notyf({
  position: {
    x: 'center',
    y: 'bottom',
  },
  types: [
    {
      type: 'success',
      duration: 5_000,
      background: 'var(--blue)',
      icon: false,
    },
    {
      type: 'error',
      duration: 20_000,
      background: 'var(--red)',
      icon: false,
    },
  ],
});

export default notify;
