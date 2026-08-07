<template>
  <tbody :class="cn('[&_tr]:odd:bg-shade-7', props.class)">
    <slot />
  </tbody>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>
