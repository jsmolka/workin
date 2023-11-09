<template>
  <div
    ref="root"
    :class="maxHeight == null ? 'flex absolute top-0 invisible' : 'flex flex-wrap overflow-hidden'"
    :style="{ maxHeight }"
  >
    <slot />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const root = ref();
const maxHeight = ref(null);

onMounted(() => {
  maxHeight.value = `${root.value.clientHeight}px`;
});
</script>
