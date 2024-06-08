<template>
  <SelectGroup :class="cn('w-full', props.class)" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SelectGroup } from 'radix-vue';
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
