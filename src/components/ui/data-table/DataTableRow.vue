<template>
  <TableRow
    :class="cn('cursor-pointer', selected && '!bg-brand-3 !text-shade-8 !font-medium', props.class)"
    :data-index="index"
    @click="selectedIndex = index"
  >
    <slot />
  </TableRow>
</template>

<script setup>
import { TableRow } from '@/components/ui/table';
import { cn } from '@/utils/ui';
import { computed } from 'vue';

const selectedIndex = defineModel('selectedIndex', { type: Number, required: false });

const props = defineProps({
  class: { required: false },
  index: { type: Number, required: false },
});

const selected = computed(() => {
  return selectedIndex.value != null && selectedIndex.value === props.index;
});
</script>
