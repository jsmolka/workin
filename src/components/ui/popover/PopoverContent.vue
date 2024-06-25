<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwardedProps, ...$attrs }"
      :class="
        cn(
          'w-80 z-50 p-3 bg-shade-7 border rounded-sm shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  align: { default: 'center' },
  alignOffset: { type: Number, required: false },
  arrowPadding: { type: Number, required: false },
  as: { required: false },
  asChild: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  class: { required: false },
  collisionBoundary: { required: false },
  collisionPadding: { type: [Number, Object], required: false },
  disableOutsidePointerEvents: { type: Boolean, required: false },
  forceMount: { type: Boolean, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  prioritizePosition: { type: Boolean, required: false },
  side: { required: false },
  sideOffset: { type: Number, default: 4 },
  sticky: { type: String, required: false },
  trapFocus: { type: Boolean, required: false },
  updatePositionStrategy: { type: String, required: false },
});

const emit = defineEmits([
  'closeAutoFocus',
  'escapeKeyDown',
  'focusOutside',
  'interactOutside',
  'openAutoFocus',
  'pointerDownOutside',
]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
