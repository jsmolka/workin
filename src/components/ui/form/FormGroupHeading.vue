<template>
  <h1 :class="cn('text-shade-1 text-base font-semibold', props.class)">
    <slot />
  </h1>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
