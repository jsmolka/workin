<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex justify-between items-center w-full h-8 gap-2 px-2 py-1.5 bg-shade-7 whitespace-nowrap border rounded-sm placeholder:text-shade-3 disabled:opacity-50 disabled:cursor-not-allowed [&>span]:truncate',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <PhCaretUpDown class="shrink-0 size-3 text-shade-3" />
    </SelectIcon>
  </SelectTrigger>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCaretUpDown } from '@phosphor-icons/vue';
import { SelectIcon, SelectTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
