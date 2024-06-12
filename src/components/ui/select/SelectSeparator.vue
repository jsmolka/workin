<template>
  <SelectSeparator v-bind="forwardedProps" :class="cn('h-px -mx-1 my-1 bg-shade-6', props.class)" />
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SelectSeparator, useForwardProps } from 'radix-vue';
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

const forwardedProps = useForwardProps(delegatedProps);
</script>
