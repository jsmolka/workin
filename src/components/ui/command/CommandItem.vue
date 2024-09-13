<template>
  <ComboboxItem
    v-bind="forwardedProps"
    :class="
      cn(
        'flex items-center px-2 py-1.5 cursor-pointer select-none rounded-sm data-[highlighted]:bg-shade-6 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        props.class,
      )
    "
  >
    <slot />
  </ComboboxItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxItem, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  value: { required: true },
});

const emit = defineEmits(['select']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
