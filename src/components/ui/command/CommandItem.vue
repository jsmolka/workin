<template>
  <ComboboxItem
    v-bind="forwardedProps"
    :class="
      cn(
        'data-[highlighted]:bg-shade-6 flex cursor-pointer items-center rounded-xs px-2 py-1.5 select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </ComboboxItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
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
