<template>
  <Input
    :model-value="time"
    @update:model-value="setTime"
    v-maska="{ mask: ['0:00', '0:0#', '0:##', '#:##', '##:##', '#:##:##', '##:##:##'] }"
    type="text"
    inputmode="numeric"
  />
</template>

<script setup>
import { Input } from '@/components/ui/input';
import { formatSeconds, parseSeconds } from '@/utils/time';
import { vMaska } from 'maska/vue';
import { ref, watch } from 'vue';

const modelValue = defineModel({ type: Number, default: null });

const zero = formatSeconds(0);
const time = ref(zero);

watch(
  modelValue,
  () => {
    if (modelValue.value != null) {
      time.value = formatSeconds(modelValue.value);
    }
  },
  { immediate: true },
);

const setTime = (value) => {
  // Remove leading zero
  // 01:30 -> 1:30
  // 00:30 -> 0:30
  value = value.replace(/^0(\d:)/, '$1');
  time.value = value.length < zero.length ? zero : value;
  modelValue.value = parseSeconds(value);
};
</script>
