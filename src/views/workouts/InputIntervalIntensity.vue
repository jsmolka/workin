<template>
  <InputNumber v-model="percentage" :min="0" :max="1000" suffix=" % FTP" />
</template>

<script setup>
import { InputNumber } from '@/components/ui/input';
import { computed } from 'vue';

const modelValue = defineModel({ type: Number, required: true });

const percentage = computed({
  get: () => 100 * modelValue.value,
  set: (value) => {
    modelValue.value = value / 100;
  },
});
</script>
