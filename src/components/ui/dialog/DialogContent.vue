<template>
  <DialogPortal>
    <DialogOverlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
    >
      <DialogContent
        v-bind="forwardedProps"
        :class="
          cn(
            'bg-shade-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 grid max-h-full max-w-screen-sm gap-4 overflow-auto rounded-xs border p-3 shadow-sm',
            props.class,
          )
        "
      >
        <slot />
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disableOutsidePointerEvents: { type: Boolean, required: false },
  forceMount: { type: Boolean, required: false },
  trapFocus: { type: Boolean, required: false },
});

const emit = defineEmits([
  'escapeKeyDown',
  'pointerDownOutside',
  'focusOutside',
  'interactOutside',
  'openAutoFocus',
  'closeAutoFocus',
]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
