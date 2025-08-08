<template>
  <SwitchRoot
    v-bind="forwardedProps"
    :class="
      cn(
        'peer data-[state=checked]:bg-brand-3 data-[state=unchecked]:bg-shade-6 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          'bg-shade-2 pointer-events-none block size-4 rounded-full transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )
      "
    />
  </SwitchRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, required: false },
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  defaultChecked: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  value: { type: String, required: false },
});

const emit = defineEmits(['update:modelValue']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
