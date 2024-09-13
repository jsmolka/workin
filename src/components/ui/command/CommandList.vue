<template>
  <ComboboxContent
    v-bind="forwardedProps"
    :class="cn('max-h-[512px] overflow-x-hidden overflow-y-auto', props.class)"
  >
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { ComboboxContent, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

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
  disableOutsidePointerEvents: { type: Boolean, required: false },
  dismissable: { type: Boolean, default: false },
  forceMount: { type: Boolean, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  position: { type: String, required: false },
  prioritizePosition: { type: Boolean, required: false },
  side: { required: false },
  sideOffset: { type: Number, required: false },
  sticky: { type: String, required: false },
  updatePositionStrategy: { type: String, required: false },
});

const emit = defineEmits([
  'escapeKeyDown',
  'focusOutside',
  'interactOutside',
  'pointerDownOutside',
]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
