import { cva } from 'class-variance-authority';

export { default as Toggle } from './Toggle.vue';

export const toggleVariants = cva(
  'inline-flex justify-center items-center font-medium text-shade-2 whitespace-nowrap select-none rounded-sm hover:bg-shade-7 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'data-[state=on]:bg-brand-3 data-[state=on]:text-shade-8',
        outline: 'border data-[state=on]:bg-shade-6',
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
