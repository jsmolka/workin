<template>
  <textarea
    :model-value="modelValue"
    @change="modelValue = $event.target.value"
    :class="
      cn(
        'flex w-full min-h-16 px-2 py-1.5 bg-shade-7 border rounded-sm placeholder:text-shade-3 disabled:opacity-50 disabled:cursor-not-allowed',
        props.class,
      )
    "
  />
</template>

<script setup>
import { cn } from '@/utils/ui';

const modelValue = defineModel({ type: String, required: false });

const props = defineProps({
  class: { required: false },
  defaultValue: { type: [String, Number], required: false },
});
</script>
