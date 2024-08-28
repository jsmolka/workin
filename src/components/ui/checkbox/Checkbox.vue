<template>
  <CheckboxRoot
    v-bind="forwardedProps"
    :checked="modelValue"
    @update:checked="emit('update:modelValue', $event)"
    :class="
      cn(
        'peer size-4 shrink-0 border border-brand-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:bg-brand-3 data-[state=checked]:text-shade-8',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex justify-center items-center">
      <PhCheck class="size-3" weight="bold" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCheck } from '@phosphor-icons/vue';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  id: { type: String, required: false },
  modelValue: { type: Boolean, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
});

const emit = defineEmits(['update:modelValue']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
