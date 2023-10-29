<template>
  <Input :value="value" @update:value="update" type="number" />
</template>

<script setup>
import Input from './Input.vue';

const props = defineProps({
  min: { type: Number },
  max: { type: Number },
});

const value = defineModel('value', { type: Number, required: true });

const update = (newValue) => {
  newValue = parseFloat(newValue);
  if (isNaN(newValue)) {
    newValue = 0;
  }

  if (props.min != null) {
    newValue = Math.max(newValue, props.min);
  }
  if (props.max != null) {
    newValue = Math.min(newValue, props.max);
  }

  value.value = newValue;
};
</script>
