<template>
  <DialogTitle
    v-bind="forwardedProps"
    :class="cn('text-base text-shade-1 font-semibold leading-none tracking-tight', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { DialogTitle, useForwardProps } from 'radix-vue';
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
