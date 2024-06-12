<template>
  <TabsList
    v-bind="forwardedProps"
    :class="
      cn(
        'inline-flex justify-center items-center h-10 p-1 bg-shade-7 text-shade-3 rounded-sm',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { TabsList, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  loop: { type: Boolean, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
