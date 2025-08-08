<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'data-[state=active]:bg-shade-6 data-[state=active]:text-shade-2 inline-flex h-8 items-center justify-center rounded-xs px-2.5 py-2 font-medium whitespace-nowrap select-none focus-visible:z-10 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { TabsTrigger, useForwardProps } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  value: { type: [String, Number], required: true },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
