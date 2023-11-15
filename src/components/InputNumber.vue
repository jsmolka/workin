<template>
  <Input :value="value" @update:value="update" type="number" />
</template>

<script setup>
import Input from './Input.vue';

const props = defineProps({
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
});

const value = defineModel('value', {
  type: Number,
  default: null,
});

const update = (newValue) => {
  newValue = parseFloat(newValue) || 0;
  if (props.min != null) {
    newValue = Math.max(newValue, props.min);
  }
  if (props.max != null) {
    newValue = Math.min(newValue, props.max);
  }
  value.value = newValue;
};
</script>
