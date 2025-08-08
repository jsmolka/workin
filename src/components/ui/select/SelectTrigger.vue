<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'bg-shade-7 placeholder:text-shade-3 flex h-8 w-full items-center justify-between gap-2 rounded-xs border px-2 py-1.5 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <PhCaretUpDown class="text-shade-3 size-3 shrink-0" />
    </SelectIcon>
  </SelectTrigger>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCaretUpDown } from '@phosphor-icons/vue';
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui';
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
