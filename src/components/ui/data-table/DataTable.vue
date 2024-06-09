<template>
  <Table ref="table">
    <slot />
  </Table>
</template>

<script setup>
import { Table } from '@/components/ui/table';
import { ref } from 'vue';

const table = ref();
const scrollTo = (index) => {
  const element = table.value.$el.querySelector(`[data-index="${index}"`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

defineExpose({ scrollTo });
</script>
