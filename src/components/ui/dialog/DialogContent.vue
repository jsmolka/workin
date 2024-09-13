<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/75 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <DialogContent
        v-bind="forwardedProps"
        :class="
          cn(
            'grid max-w-screen-sm max-h-full gap-4 p-3 bg-shade-8 border rounded-sm shadow overflow-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
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
import { DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'radix-vue';
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
