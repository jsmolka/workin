<template>
  <div
    ref="container"
    class="flex"
    :class="maxHeight != null ? 'flex-wrap overflow-hidden' : 'absolute invisible'"
    :style="{ maxHeight }"
  >
    <slot />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const container = ref();
const maxHeight = ref(null);

onMounted(() => {
  maxHeight.value = `${container.value.clientHeight}px`;
});
</script>
