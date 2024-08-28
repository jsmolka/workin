<template>
  <DropdownMenuRadioItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex items-center pl-8 pr-2 py-1.5 cursor-pointer select-none rounded-sm focus:bg-shade-6 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex justify-center items-center size-4">
      <DropdownMenuItemIndicator>
        <PhCircle class="size-1.5" weight="fill" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhCircle } from '@phosphor-icons/vue';
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  value: { type: String, required: true },
});

const emit = defineEmits(['select']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);
</script>
