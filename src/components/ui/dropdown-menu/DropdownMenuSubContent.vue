<template>
  <DropdownMenuSubContent
    v-bind="forwardedProps"
    :class="
      cn(
        'min-w-32 z-50 p-1 bg-shade-7 text-shade-2 border rounded-sm shadow overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuSubContent>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { DropdownMenuSubContent, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  alignOffset: { type: Number, required: false },
  arrowPadding: { type: Number, required: false },
  as: { required: false },
  asChild: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  class: { required: false },
  collisionBoundary: { required: false },
  collisionPadding: { type: [Number, Object], required: false },
  forceMount: { type: Boolean, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  loop: { type: Boolean, required: false },
  prioritizePosition: { type: Boolean, required: false },
  sideOffset: { type: Number, required: false },
  sticky: { type: String, required: false },
  updatePositionStrategy: { type: String, required: false },
});

const emit = defineEmits([
  'closeAutoFocus',
  'entryFocus',
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
