<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex flex-col gap-4', props.class)">
    <slot />
  </Primitive>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { Primitive } from 'radix-vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  asChild: { type: Boolean, required: false },
  class: { required: false },
});
</script>
