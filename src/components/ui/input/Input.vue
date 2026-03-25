<template>
  <input
    :class="
      cn(
        'bg-shade-7 placeholder:text-shade-3 flex h-8 w-full rounded-xs border px-2 py-1.5 text-ellipsis disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    :value="modelValue"
    @input="update"
    @change="update"
    @focus="select"
  />
</template>

<script setup>
import { useForceUpdate } from '@/composables/useForceUpdate';
import { cn } from '@/utils/ui';
import { nextTick } from 'vue';

const modelValue = defineModel({ type: String, required: false });

const props = defineProps({
  class: { required: false },
  event: { type: String, default: 'input' },
});

const select = (event) => {
  // Safari workaround
  requestAnimationFrame(() => {
    event.target.select();
  });
};

const forceUpdate = useForceUpdate();

const update = async (event) => {
  if (event.type !== props.event) {
    return;
  }

  modelValue.value = event.target.value;

  await nextTick();
  forceUpdate();
};
</script>
