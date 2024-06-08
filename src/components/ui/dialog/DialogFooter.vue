<template>
  <div :class="cn('flex flex-col sm:flex-row-reverse gap-2', props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
