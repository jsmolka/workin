import { cva } from 'class-variance-authority';

export { default as Toggle } from './Toggle.vue';

export const toggleVariants = cva(
  'text-shade-2 hover:bg-shade-7 inline-flex items-center justify-center rounded-xs font-medium whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=on]:bg-brand-3 data-[state=on]:text-shade-8',
        outline: 'data-[state=on]:bg-shade-6 border',
        ghost: 'data-[state=on]:bg-shade-6',
      },
      size: {
        default: 'h-8 px-2.5 py-2',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
