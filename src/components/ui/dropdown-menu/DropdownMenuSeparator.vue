<template>
  <DropdownMenuSeparator
    v-bind="delegatedProps"
    :class="cn('h-px -mx-1 my-1 bg-shade-6', props.class)"
  />
</template>

<script setup>
import { cn } from '@/utils/ui';
import { DropdownMenuSeparator } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
