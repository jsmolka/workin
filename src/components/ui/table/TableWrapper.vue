<template>
  <div :class="cn('relative w-full border rounded-sm overflow-auto', props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
