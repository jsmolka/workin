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
import { Primitive } from 'radix-vue';
import { buttonVariants } from '.';

const props = defineProps({
  as: { default: 'button' },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  size: { required: false },
  variant: { required: false },
});
</script>
