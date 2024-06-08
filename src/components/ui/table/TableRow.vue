<template>
  <tr :class="cn('border-b', props.class)">
    <slot />
  </tr>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
