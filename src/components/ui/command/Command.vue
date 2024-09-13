<template>
  <ComboboxRoot v-bind="forwardedProps" :class="cn('flex flex-col rounded-sm', props.class)">
    <slot />
  </ComboboxRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxRoot, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  defaultOpen: { type: Boolean, required: false },
  defaultValue: { required: false },
  dir: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  displayValue: { type: Function, required: false },
  filterFunction: { type: Function, required: false },
  modelValue: { default: '' },
  multiple: { type: Boolean, required: false },
  name: { type: String, required: false },
  open: { type: Boolean, default: true },
  resetSearchTermOnBlur: { type: Boolean, required: false },
  searchTerm: { type: String, required: false },
  selectedValue: { required: false },
});

const emit = defineEmits([
  'update:modelValue',
  'update:open',
  'update:searchTerm',
  'update:selectedValue',
]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
