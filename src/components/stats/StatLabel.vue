<template>
  <label :class="cn('text-xs text-shade-3 font-medium uppercase whitespace-nowrap', props.class)">
    <slot />
  </label>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
