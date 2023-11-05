<template>Workout {{ index }}</template>

<script setup>
defineProps({
  index: {
    type: Number,
    required: true,
  },
});
</script>
