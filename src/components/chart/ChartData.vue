<template>
  <g>
    <Polyline v-for="points in lines(data)" :points="points" />
  </g>
</template>

<script setup>
import { math } from '../../utils/math';
import Polyline from './Polyline.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  maxX: {
    type: Number,
    required: true,
  },
  maxY: {
    type: Number,
    required: true,
  },
});

const percent = (value) => 100 * math.clamp(value, 0, 1);

function* lines(data) {
  let points = [];
  const maxX = props.maxX;
  const maxY = props.maxY;
  const index = props.index;
  for (let i = 0; i < data.length; i++) {
    const value = data[i]?.[index];
    if (value != null) {
      points.push(percent(i / (maxX - 1)));
      points.push(percent(value / maxY));

      let j = i + 1;
      for (; j < data.length; j++) {
        const nextValue = data[j]?.[index];
        if (nextValue !== value) {
          break;
        }
      }

      if (j !== i + 1) {
        points.push(percent(j / (maxX - 1)));
        points.push(percent(value / maxY));
        i = j;
      }
    }

    if ((value == null || i >= data.length - 1) && points.length > 0) {
      yield points;
      points = [];
    }
  }
}
</script>
