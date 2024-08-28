<template>
  <ToggleGroupRoot
    v-bind="forwardedProps"
    :class="cn('flex justify-center items-center gap-2', props.class)"
  >
    <slot />
  </ToggleGroupRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ToggleGroupRoot, useForwardPropsEmits } from 'radix-vue';
import { computed, provide } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  defaultValue: { required: false },
  dir: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  loop: { type: Boolean, required: false },
  modelValue: { required: false },
  orientation: { type: String, required: false },
  rovingFocus: { type: Boolean, required: false },
  size: { required: false },
  type: { required: false },
  variant: { required: false },
});

const emit = defineEmits(['update:modelValue']);

provide('toggleGroup', {
  size: props.size,
  variant: props.variant,
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
