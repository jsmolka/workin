import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'bottom',
  },
  types: [
    {
      type: 'success',
      duration: 2_000,
      background: 'var(--frost-3)',
    },
    {
      type: 'error',
      duration: 20_000,
      background: 'var(--aurora-1)',
    },
  ],
});

export default notyf;
