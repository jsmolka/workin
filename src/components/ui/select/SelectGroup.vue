<template>
  <SelectGroup v-bind="forwardedProps" :class="cn('w-full', props.class)">
    <slot />
  </SelectGroup>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SelectGroup, useForwardProps } from 'radix-vue';
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
