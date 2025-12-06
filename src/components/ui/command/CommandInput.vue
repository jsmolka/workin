<template>
  <div class="flex items-center gap-2 border-b p-3">
    <PhMagnifyingGlass class="text-shade-3 size-4 shrink-0" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="
        cn(
          'placeholder:text-shade-3 bg-transparent text-ellipsis focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
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
import { ComboboxInput, useForwardProps } from 'reka-ui';
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
