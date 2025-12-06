<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'skip-ink-none decoration-shade-5 cursor-pointer font-bold underline decoration-2 underline-offset-2',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { Primitive } from 'reka-ui';

const props = defineProps({
  as: { default: 'a' },
  asChild: { type: Boolean, required: false },
  class: { required: false },
});
</script>
