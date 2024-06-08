<template>
  <td :class="cn('px-2 py-1.5', props.class)">
    <slot />
  </td>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
