import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
  'inline-flex justify-center items-center font-medium whitespace-nowrap select-none rounded-sm disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-brand-3 text-shade-8 hover:bg-brand-2',
        secondary: 'bg-shade-6 text-shade-2 hover:bg-shade-5',
        outline: 'text-shade-2 border hover:bg-shade-7',
        ghost: 'text-shade-2 hover:bg-shade-7',
      },
      size: {
        default: 'h-8 px-2.5 py-2',
        icon: 'shrink-0 size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
