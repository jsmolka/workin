<template>
  <TabsContent
    :class="
      cn(
        'mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-3',
        props.class,
      )
    "
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { TabsContent } from 'radix-vue';
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
</script>
