<template>
  <TabsContent v-bind="forwardedProps" :class="cn('mt-2', props.class)" :tabindex="undefined">
    <slot />
  </TabsContent>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { TabsContent, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  forceMount: { type: Boolean, required: false },
  value: { type: [String, Number], required: true },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
