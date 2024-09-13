<template>
  <span :class="cn('ml-auto text-xs text-shade-3 tracking-widest', props.class)">
    <slot />
  </span>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
