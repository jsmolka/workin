<template>
  <Label
    v-bind="forwardedProps"
    :class="
      cn(
        'text-xs font-medium leading-none uppercase peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { Label, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  for: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
