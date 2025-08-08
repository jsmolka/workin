<template>
  <CheckboxRoot
    v-bind="forwardedProps"
    :class="
      cn(
        'peer border-brand-3 data-[state=checked]:bg-brand-3 data-[state=checked]:text-shade-8 size-4 shrink-0 rounded-xs border disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex items-center justify-center">
      <PhCheck class="size-3" weight="bold" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCheck } from '@phosphor-icons/vue';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
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
