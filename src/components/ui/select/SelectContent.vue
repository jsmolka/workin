<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwardedProps, ...$attrs }"
      :class="
        cn(
          'relative min-w-32 max-h-96 z-50 p-1 bg-shade-7 text-shade-2 border rounded-sm shadow overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'w-full min-w-[--radix-select-trigger-width] min-h-[--radix-select-trigger-height] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          props.class,
        )
      "
    >
      <slot />
    </SelectContent>
  </SelectPortal>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { SelectContent, SelectPortal, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  align: { required: false },
  alignOffset: { type: Number, required: false },
  arrowPadding: { type: Number, required: false },
  as: { required: false },
  asChild: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  bodyLock: { type: Boolean, required: false },
  class: { required: false },
  collisionBoundary: { required: false },
  collisionPadding: { type: [Number, Object], required: false },
  forceMount: { type: Boolean, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  position: { type: String, default: 'popper' },
  prioritizePosition: { type: Boolean, required: false },
  side: { required: false },
  sideOffset: { type: Number, required: false },
  sticky: { type: String, required: false },
  updatePositionStrategy: { type: String, required: false },
});

const emit = defineEmits(['closeAutoFocus', 'escapeKeyDown', 'pointerDownOutside']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
