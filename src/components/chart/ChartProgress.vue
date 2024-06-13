<template>
  <g>
    <Rect v-percent:x="0" v-percent:width="x" v-percent:height="1" class="fill-shade-8" />
    <slot :x="x" />
    <Line
      v-percent:x1="x"
      v-percent:y1="0"
      v-percent:x2="x"
      v-percent:y2="1"
      class="stroke-2 stroke-shade-2"
    />
  </g>
</template>

<script setup>
import Line from '@/components/chart/Line.vue';
import Rect from '@/components/chart/Rect.vue';
import { computed } from 'vue';

const props = defineProps({
  maxX: { type: Number, required: true },
  x: { type: Number, required: true },
});

const x = computed(() => props.x / props.maxX);
</script>
