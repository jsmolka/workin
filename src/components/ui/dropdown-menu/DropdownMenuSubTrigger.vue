<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex items-center px-2 py-1.5 cursor-pointer select-none rounded-sm focus:bg-shade-6 data-[state=open]:bg-shade-6',
        props.class,
      )
    "
  >
    <slot />
    <PhCaretRight class="size-3 ml-auto" />
  </DropdownMenuSubTrigger>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCaretRight } from '@phosphor-icons/vue';
import { DropdownMenuSubTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
