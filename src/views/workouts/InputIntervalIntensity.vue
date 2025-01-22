<template>
  <InputNumber v-model="percentage" :min="0" :max="1000" suffix="% FTP" />
</template>

<script setup>
import { InputNumber } from '@/components/ui/input';
import { computed } from 'vue';

const modelValue = defineModel({ type: Number });

const percentage = computed({
  get: () => (modelValue.value != null ? 100 * modelValue.value : null),
  set: (value) => {
    modelValue.value = value / 100;
  },
});
</script>
