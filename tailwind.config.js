import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,vue}'],
  theme: {
    colors: {
      gray: {
        1: 'var(--gray-1)',
        2: 'var(--gray-2)',
        3: 'var(--gray-3)',
        4: 'var(--gray-4)',
        5: 'var(--gray-5)',
        6: 'var(--gray-6)',
        7: 'var(--gray-7)',
        8: 'var(--gray-8)',
      },
      blue: {
        1: 'var(--blue-1)',
        2: 'var(--blue-2)',
        3: 'var(--blue-3)',
      },
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
    },
  },
};
