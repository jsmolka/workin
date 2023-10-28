<template>
  <div class="flex flex-col justify-center items-center gap-2">
    <div class="text-gray-3 text-xs font-medium uppercase">{{ label }}</div>
    <div class="text-gray-1 text-4xl font-bold">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
});
</script>
