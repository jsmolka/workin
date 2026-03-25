<template>
  <input
    :class="
      cn(
        'bg-shade-7 placeholder:text-shade-3 flex h-8 w-full rounded-xs border px-2 py-1.5 text-ellipsis disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    :value="value"
    @input="update"
    @change="update"
    @focus="select"
  />
</template>

<script setup>
import { useForceUpdate } from '@/composables/useForceUpdate';
import { cn } from '@/utils/ui';
import { computed, nextTick } from 'vue';

const modelValue = defineModel({ type: String, required: false });

const props = defineProps({
  class: { required: false },
  event: { type: String, default: 'input' },
  nullable: { type: Boolean, default: false },
});

const value = computed(() => {
  return modelValue.value ?? '';
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

  let value = event.target.value;
  if (value === '' && props.nullable) {
    value = null;
  }

  if (modelValue.value !== value) {
    modelValue.value = value;
  }

  await nextTick();
  forceUpdate();
};
</script>
