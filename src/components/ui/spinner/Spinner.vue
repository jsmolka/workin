<template>
  <span :class="cn(variants({ variant, size }), props.class)" />
</template>

<script setup>
import { cn } from '@/utils/ui';
import { cva } from 'class-variance-authority';

const props = defineProps({
  class: { required: false },
  size: { required: false },
  variant: { required: false },
});

const variants = cva('animate-spin rounded-full', {
  variants: {
    variant: {
      default: 'border-shade-8 border-b-transparent',
      secondary: 'border-shade-4 border-b-brand-3',
      ghost: 'border-shade-6 border-b-brand-3',
    },
    size: {
      small: 'size-4 border-2',
      medium: 'size-6 border-3',
      large: 'size-8 border-4',
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'small',
  },
});
</script>
