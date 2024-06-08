<template>
  <SwitchRoot
    v-model:checked="modelValue"
    v-bind="forwarded"
    :class="
      cn(
        'peer inline-flex items-center shrink-0 w-9 h-5 cursor-pointer border-2 border-transparent rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-3 disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:bg-brand-3 data-[state=unchecked]:bg-shade-6',
        props.class,
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          'block size-4 bg-shade-8 rounded-full pointer-events-none ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )
      "
    />
  </SwitchRoot>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SwitchRoot, SwitchThumb, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const modelValue = defineModel({ type: Boolean, required: false });

const props = defineProps({
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

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>
