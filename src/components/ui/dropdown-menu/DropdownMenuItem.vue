<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex items-center px-2 py-1.5 cursor-pointer rounded-sm outline-none select-none transition-colors focus:bg-shade-6 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { DropdownMenuItem, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  inset: { type: Boolean, required: false },
  textValue: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
