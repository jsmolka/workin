<template>
  <DialogTitle
    v-bind="forwardedProps"
    :class="cn('text-shade-1 text-base leading-none font-semibold tracking-tight', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { DialogTitle, useForwardProps } from 'reka-ui';
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
