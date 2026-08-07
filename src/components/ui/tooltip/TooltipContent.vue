<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwardedProps, ...$attrs }"
      :class="
        cn(
          'bg-shade-7 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-xs px-2 py-1.5 text-xs font-medium shadow-sm',
          props.class,
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  align: { required: false },
  alignOffset: { type: Number, required: false },
  ariaLabel: { type: String, required: false },
  arrowPadding: { type: Number, required: false },
  as: { required: false },
  asChild: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  class: { required: false },
  collisionBoundary: { required: false },
  collisionPadding: { type: [Number, Object], required: false },
  hideWhenDetached: { type: Boolean, required: false },
  side: { required: false },
  sideOffset: { type: Number, default: 4 },
  sticky: { type: String, required: false },
});

const emit = defineEmits(['escapeKeyDown', 'pointerDownOutside']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
