<template>
  <Input
    v-model="duration"
    v-maska
    data-maska="['#:##', '##:##', '#:##:##', '##:##:##']"
    type="text"
    inputmode="numeric"
  />
</template>

<script setup>
import { Input } from '@/components/ui/input';
import { formatSeconds, parseSeconds } from '@/utils/time';
import { vMaska } from 'maska/vue';
import { computed } from 'vue';

const modelValue = defineModel({ type: Number });

const duration = computed({
  get: () => (modelValue.value != null ? formatSeconds(modelValue.value) : null),
  set: (value) => {
    modelValue.value = parseSeconds(value);
  },
});
</script>
