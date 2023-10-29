<template>
  <Listbox v-model="value">
    <div class="relative">
      <ListboxButton class="button w-full flex justify-between items-center gap-4">
        <div class="truncate">
          <slot name="item" :item="value">
            {{ value }}
          </slot>
        </div>
        <ChevronUpDownIcon class="h-5 w-5 text-gray-3" aria-hidden="true" />
      </ListboxButton>

      <ListboxOptions
        class="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-sm bg-gray-6 py-1 focus:outline-none"
      >
        <ListboxOption
          v-slot="{ selected, disabled }"
          v-for="item in items"
          :value="item"
          :disabled="isDisabled(item)"
          as="template"
        >
          <li
            class="px-2 py-1.5 hover:bg-gray-5 cursor-pointer select-none truncate"
            :class="[{ disabled }, { 'bg-gray-4': selected }]"
          >
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

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const value = defineModel('value', { required: true });

const isObject = (item) => {
  return typeof item === 'object' && item !== null;
};

const isDisabled = (item) => {
  return isObject(item) && item.disabled === true;
};
</script>

<style lang="scss" scoped>
.button {
  @apply px-2;
  @apply py-1.5;
  @apply bg-gray-6;
  @apply rounded-sm;
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
