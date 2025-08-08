<template>
  <span :class="cn('text-shade-3 ml-auto text-xs tracking-widest', props.class)">
    <slot />
  </span>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
