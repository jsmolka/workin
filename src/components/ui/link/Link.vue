<template>
  <a
    :class="
      cn('font-bold underline underline-offset-2 decoration-2 decoration-shade-5', props.class)
    "
  >
    <slot />
  </a>
</template>

<script setup>
import { cn } from '@/utils/ui';

const props = defineProps({
  class: { required: false },
});
</script>

<style scoped>
a {
  text-decoration-skip-ink: none;
}
</style>
