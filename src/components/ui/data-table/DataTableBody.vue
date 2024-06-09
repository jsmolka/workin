<template>
  <TableBody :class="cn('hover:[&_tr]:bg-shade-6 hover:odd:[&_tr]:bg-shade-6', props.class)">
    <slot />
  </TableBody>
</template>

<script setup>
import { TableBody } from '@/components/ui/table';
import { cn } from '@/utils/ui';

const props = {
  class: { required: false },
};
</script>
