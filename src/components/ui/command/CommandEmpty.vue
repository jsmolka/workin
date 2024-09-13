<template>
  <ComboboxEmpty v-bind="delegatedProps" :class="cn('py-3 text-center', props.class)">
    <slot />
  </ComboboxEmpty>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxEmpty } from 'radix-vue';
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
