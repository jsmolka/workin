<template>
  <tbody :class="cn('odd:[&_tr]:bg-shade-7 last:[&_tr]:border-b-0', props.class)">
    <slot />
  </tbody>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
