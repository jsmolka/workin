<template>
  <table :class="cn('w-full', props.class)">
    <slot />
  </table>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
