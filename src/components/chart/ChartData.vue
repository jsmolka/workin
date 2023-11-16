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
  property: {
    type: String,
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
  for (let i = 0; i <= data.length; i++) {
    const value = data[i]?.[props.property];
    if (value != null) {
      points.push(percent(i / (props.maxX - 1)));
      points.push(percent(value / props.maxY));
    } else if (points.length > 0) {
      yield points;
      points = [];
    }
  }
}
</script>
