<template>
  <SelectLabel
    v-bind="forwardedProps"
    :class="cn('px-2 py-1.5 text-shade-1 font-semibold', props.class)"
  >
    <slot />
  </SelectLabel>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SelectLabel, useForwardProps } from 'radix-vue';
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
