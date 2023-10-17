<template>
  <div class="flex flex-col gap-2">
    <label class="text-xs text-white-3 font-medium uppercase">{{ text }}</label>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
