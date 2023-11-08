<template>
  <div class="grid place-items-center gap-2">
    <span class="text-gray-3 text-xs font-medium uppercase">{{ text }}</span>
    <span class="text-4xl font-bold" :class="value != null ? 'text-gray-1' : 'text-gray-3'">
      {{ value ?? '-' }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  value: null,
});
</script>
