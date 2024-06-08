<template>
  <DropdownMenuCheckboxItem
    v-model:checked="modelValue"
    v-bind="forwarded"
    :class="
      cn(
        'relative flex items-center pl-8 pr-2 py-1.5 cursor-pointer select-none rounded-sm outline-none transition-colors focus:bg-shade-6 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex justify-center items-center size-3.5">
      <DropdownMenuItemIndicator>
        <CheckIcon class="size-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { CheckIcon } from '@radix-icons/vue';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';

const modelValue = defineModel({ type: Boolean, required: false });

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
});

const emits = defineEmits(['select']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
