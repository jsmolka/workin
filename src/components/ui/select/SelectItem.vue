<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-shade-6 relative flex w-full cursor-pointer items-center rounded-xs py-1.5 pr-8 pl-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
  >
    <slot />
    <SelectItemIndicator as-child>
      <PhCheck class="text-shade-3 absolute right-2 size-3" weight="bold" />
    </SelectItemIndicator>
  </SelectItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCheck } from '@phosphor-icons/vue';
import { SelectItem, SelectItemIndicator, useForwardProps } from 'reka-ui';
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
