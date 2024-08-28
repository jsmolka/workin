<template>
  <Toggle
    v-bind="forwardedProps"
    :pressed="modelValue"
    @update:pressed="emit('update:modelValue', $event)"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot />
  </Toggle>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { Toggle, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';
import { toggleVariants } from '.';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  defaultValue: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false, default: false },
  modelValue: { type: Boolean, required: false },
  size: { required: false, default: 'default' },
  variant: { required: false, default: 'default' },
});

const emit = defineEmits(['update:modelValue']);

const delegatedProps = computed(() => {
  const { class: _, size, variant, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
