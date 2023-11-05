<template>
  <div class="flex flex-wrap overflow-hidden" :class="class" :style="{ maxHeight }">
    <slot />
  </div>
  <Teleport to="body">
    <div ref="content" class="absolute top-0 invisible flex" :class="class">
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core';
import { ref } from 'vue';

defineProps({
  class: {
    type: String,
    required: false,
  },
});

const content = ref();
const maxHeight = ref(null);

useResizeObserver(content, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  maxHeight.value = `${height}px`;
});
</script>
