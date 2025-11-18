<template>
  <div
    ref="element"
    :class="
      cn('flex gap-4', height != null ? 'flex-wrap overflow-hidden' : 'invisible', props.class)
    "
    :style="{
      minHeight: height,
      maxHeight: height,
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { onMounted, ref, useTemplateRef } from 'vue';

const props = defineProps({
  class: { required: false },
});

const height = ref(null);
const element = useTemplateRef('element');

onMounted(() => {
  height.value = `${element.value.clientHeight}px`;
});
</script>
