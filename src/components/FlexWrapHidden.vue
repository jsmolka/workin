<template>
  <div
    ref="container"
    :class="maxHeight == null ? 'flex absolute top-0 invisible' : 'flex flex-wrap overflow-hidden'"
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
