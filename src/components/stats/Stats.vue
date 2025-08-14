<template>
  <div
    ref="element"
    :class="
      cn(
        'flex gap-4',
        maxHeight != null ? 'flex-wrap overflow-hidden' : 'invisible absolute',
        props.class,
      )
    "
    :style="{ maxHeight }"
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

const element = useTemplateRef('element');
const maxHeight = ref(null);

onMounted(() => {
  maxHeight.value = `${element.value.clientHeight}px`;
});
</script>
