<template>
  <g>
    <Polyline v-for="points in lines(data)" :points="points" stroke-width="2" v-bind="$attrs" />
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
const x = (value) => percent(value / props.maxX);
const y = (value) => percent(value / props.maxY);

function* lines(data) {
  let points = [];
  // `i <= data.length` to have at least one null value
  for (let i = 0; i <= data.length; i++) {
    const value = data[i]?.[props.property];
    if (value != null) {
      points.push(x(i));
      points.push(y(value));
    } else if (points.length > 0) {
      yield points;
      points = [];
    }
  }
}
</script>
