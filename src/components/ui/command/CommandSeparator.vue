<template>
  <ComboboxSeparator v-bind="delegatedProps" :class="cn('bg-shade-6 h-px', props.class)">
    <slot />
  </ComboboxSeparator>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxSeparator } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
