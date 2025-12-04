<template>
  <div :class="cn('grid gap-2', { 'auto-cols-fr grid-flow-col': !hasFixedColumns }, props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { clsx } from 'clsx';
import { computed } from 'vue';

const props = defineProps({
  class: { required: false },
});

const hasFixedColumns = computed(() => {
  return clsx(props.class).includes('grid-cols-');
});
</script>
