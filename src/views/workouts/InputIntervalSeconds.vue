<template>
  <Input
    :model-value="time"
    @update:model-value="
      time = $event;
      modelValue = parseSeconds($event);
    "
    v-maska="{ mask: ['##', '#:##', '##:##', '#:##:##', '##:##:##'] }"
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

const time = ref(formatSeconds(0));

watch(
  modelValue,
  () => {
    if (modelValue.value != null) {
      time.value = formatSeconds(modelValue.value);
    }
  },
  { immediate: true },
);
</script>
