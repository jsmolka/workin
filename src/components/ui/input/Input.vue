<template>
  <input
    :class="
      cn(
        'bg-shade-7 placeholder:text-shade-3 flex h-8 w-full rounded-xs border px-2 py-1.5 overflow-ellipsis disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    :value="modelValue"
    @change="change"
    @focusin="$event.target.select()"
  />
</template>

<script setup>
import { useForceUpdate } from '@/composables/useForceUpdate';
import { cn } from '@/utils/ui';
import { nextTick } from 'vue';

const modelValue = defineModel({ type: String, required: false });

const props = defineProps({
  class: { required: false },
});

const forceUpdate = useForceUpdate();

const change = async (event) => {
  modelValue.value = event.target.value;

  await nextTick();
  forceUpdate();
};
</script>
