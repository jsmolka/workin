<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'font-bold cursor-pointer underline underline-offset-2 decoration-2 decoration-shade-5 skip-ink-none',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { Primitive } from 'radix-vue';

const props = defineProps({
  as: { default: 'a' },
  asChild: { type: Boolean, required: false },
  class: { required: false },
});
</script>
