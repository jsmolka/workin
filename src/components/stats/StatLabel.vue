<template>
  <label :class="cn('text-shade-3 text-xs font-medium whitespace-nowrap uppercase', props.class)">
    <slot />
  </label>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
