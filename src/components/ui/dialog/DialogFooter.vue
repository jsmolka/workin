<template>
  <div :class="cn('flex flex-col gap-2 sm:flex-row-reverse', props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
