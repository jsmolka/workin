<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex items-center w-full pl-2 pr-8 py-1.5 cursor-pointer rounded-sm focus:bg-shade-6 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        props.class,
      )
    "
  >
    <slot />
    <SelectItemIndicator as-child>
      <PhCheck class="absolute right-2 size-3 text-shade-3" weight="bold" />
    </SelectItemIndicator>
  </SelectItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCheck } from '@phosphor-icons/vue';
import { SelectItem, SelectItemIndicator, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  value: { type: String, required: true },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
