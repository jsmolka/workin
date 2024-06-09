<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { cva } from 'class-variance-authority';
import { Primitive } from 'radix-vue';

const props = defineProps({
  as: { default: 'button' },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  size: { required: false },
  variant: { required: false },
});

const buttonVariants = cva(
  'inline-flex justify-center items-center font-medium whitespace-nowrap select-none rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-3 disabled:opacity-50 disabled:pointer-events-none',
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
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
</script>
