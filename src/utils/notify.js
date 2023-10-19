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
      duration: 20_000,
      background: 'var(--blue-3)',
      icon: false,
    },
  ],
});

export default notify;
