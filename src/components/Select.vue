<template>
  <Listbox v-model="value">
    <div class="relative">
      <ListboxButton class="button flex justify-between items-center gap-4 w-full">
        <div class="truncate">
          <slot name="item" :item="value">
            {{ value }}
          </slot>
        </div>
        <ChevronUpDownIcon class="w-5 h-5 text-gray-3" aria-hidden="true" />
      </ListboxButton>
      <ListboxOptions
        class="absolute w-full max-h-60 mt-2 bg-gray-6 rounded-sm shadow overflow-auto z-50"
      >
        <ListboxOption
          v-for="item in items"
          v-slot="{ selected, disabled }"
          :value="item"
          :disabled="isDisabled(item)"
          as="template"
        >
          <li class="button !rounded-none truncate" :class="{ '!bg-gray-4': selected, disabled }">
            <slot name="item" :item="item">
              {{ item }}
            </slot>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid';

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const value = defineModel('value', {
  required: true,
});

const isObject = (item) => {
  return typeof item === 'object' && item !== null;
};

const isDisabled = (item) => {
  return isObject(item) && item.disabled;
};
</script>

<style lang="scss" scoped>
.button {
  @apply px-2;
  @apply py-1.5;
  @apply bg-gray-6;
  @apply rounded-sm;
  @apply cursor-pointer;
  @apply select-none;

  &:hover {
    @apply bg-gray-5;
  }

  &:focus {
    @apply outline-none;
  }

  &:active {
    @apply bg-gray-4;
  }
}
</style>
