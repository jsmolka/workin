<template>
  <input
    :class="
      cn(
        'flex w-full h-8 px-2 py-1.5 bg-shade-7 border rounded-sm overflow-ellipsis placeholder:text-shade-3 disabled:opacity-50 disabled:cursor-not-allowed',
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
