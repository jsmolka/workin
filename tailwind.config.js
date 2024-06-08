import animate from 'tailwindcss-animate';
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,vue}'],
  theme: {
    colors: {
      shade: {
        1: 'var(--shade-1)',
        2: 'var(--shade-2)',
        3: 'var(--shade-3)',
        4: 'var(--shade-4)',
        5: 'var(--shade-5)',
        6: 'var(--shade-6)',
        7: 'var(--shade-7)',
        8: 'var(--shade-8)',
      },
      brand: {
        1: 'var(--brand-1)',
        2: 'var(--brand-2)',
        3: 'var(--brand-3)',
      },
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
    },
  },
  plugins: [animate],
};
