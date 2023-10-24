<template>
  <Input :value="value" @update:value="update" type="number" />
</template>

<script setup>
import Input from './Input.vue';

const props = defineProps({
  min: { type: Number },
  max: { type: Number },
});

const value = defineModel('value', { required: true, type: Number });

const update = (newValue) => {
  newValue = parseFloat(newValue);
  if (props.min != null) {
    newValue = Math.max(newValue, props.min);
  }
  if (props.max != null) {
    newValue = Math.min(newValue, props.max);
  }
  value.value = newValue;
};
</script>
