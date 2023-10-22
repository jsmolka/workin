<template>
  <Input :value="value" @update:value="update" type="number" />
</template>

<script setup>
import Input from "./Input.vue";

const { min, max } = defineProps({
  min: { type: Number },
  max: { type: Number },
});

const value = defineModel("value", { required: true, type: Number });

const update = (newValue) => {
  newValue = parseFloat(newValue);
  if (min != null) {
    newValue = Math.max(newValue, min);
  }
  if (max != null) {
    newValue = Math.min(newValue, max);
  }
  value.value = newValue;
};
</script>
