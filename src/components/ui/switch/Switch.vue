<template>
  <SwitchRoot
    v-bind="forwardedProps"
    :checked="modelValue"
    @update:checked="emit('update:modelValue', $event)"
    :class="
      cn(
        'peer inline-flex items-center shrink-0 w-9 h-5 cursor-pointer border-2 border-transparent rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:bg-brand-3 data-[state=unchecked]:bg-shade-6',
        props.class,
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          'block size-4 bg-shade-2 rounded-full pointer-events-none transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )
      "
    />
  </SwitchRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'radix-vue';
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
