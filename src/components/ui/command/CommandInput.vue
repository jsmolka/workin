<template>
  <div class="flex items-center gap-2 p-3 border-b">
    <PhMagnifyingGlass class="shrink-0 size-4 text-shade-3" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="
        cn(
          'bg-transparent overflow-ellipsis placeholder:text-shade-3 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-0',
          props.class,
        )
      "
      @focusin="$event.target.select()"
    />
  </div>
</template>

<script setup>
import { cn } from '@/utils/ui';
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import { ComboboxInput, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  as: { required: false },
  asChild: { type: Boolean, required: false },
  autoFocus: { type: Boolean, required: false },
  class: { required: false },
  disabled: { type: Boolean, required: false },
  type: { type: String, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
