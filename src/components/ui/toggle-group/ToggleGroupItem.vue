<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        toggleVariants({
          size: context?.size || size,
          variant: context?.variant || variant,
        }),
        props.class,
      )
    "
  >
    <slot />
  </ToggleGroupItem>
</template>

<script setup>
import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/utils/ui';
import { ToggleGroupItem, useForwardProps } from 'radix-vue';
import { computed, inject } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  defaultValue: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  pressed: { type: Boolean, required: false },
  size: { required: false },
  value: { type: String, required: true },
  variant: { required: false },
});

const context = inject('toggleGroup');

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
