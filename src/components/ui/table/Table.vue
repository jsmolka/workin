<template>
  <div class="relative w-full border rounded-sm overflow-auto">
    <table :class="cn('w-full', props.class)">
      <slot />
    </table>
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
