<template>
  <ComboboxGroup v-bind="delegatedProps" :class="cn('overflow-hidden p-1', props.class)">
    <ComboboxLabel v-if="heading" class="px-2 py-1.5 text-xs font-medium text-shade-3">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxGroup, ComboboxLabel } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  heading: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
